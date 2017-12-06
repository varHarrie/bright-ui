import './InputNumber.less'

import * as React from 'react'

import Base, {RadiusType} from '../../common/Base'
import Input from '../Input'

const TIMER_DELAY = 600

const TIMER_INTERVAL = 200

export interface IInputNumberProps {
  size?: 'small' | 'normal' | 'large'
  value?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  full?: boolean
  radius?: RadiusType
  autoFocus?: boolean
  showHandlers?: boolean
  prefix?: React.ReactNode | string
  formatter?: (value: number | string) => string
  parser?: (value: string) => number
  onChange?: (e: React.ChangeEvent<any> | React.MouseEvent<any>, value: number) => void
  onFocus?: React.FormEventHandler<any>
  onBlur?: React.FormEventHandler<any>
  onKeyDown?: React.FormEventHandler<any>
}

export interface IInputNumberState {
  value: string
}

export default class InputNumber extends Base<IInputNumberProps, IInputNumberState> {

  lastValidValue: number = 0

  focused: boolean

  delayTimer: number

  stepTimer: number

  constructor (props: IInputNumberProps) {
    super(props)

    this.focused = !!props.autoFocus

    this.state = {
      value: `${props.value || 0}`
    }
  }

  componentWillReceiveProps ({value = 0}: IInputNumberProps) {
    if (value !== this.props.value) {
      if (this.focused) {
        return
      } else {
        this.setState({value: value.toString()})
      }
    }
  }

  defaultFormatter = (value: number | string) => {
    return value.toString()
  }

  defaultParser = (value: string) => {
    return Number(value.replace(/[^\d.-]/g, ''))
  }

  toValidValue = (value: number) => {
    const {min, max, precision} = this.props

    if (precision !== undefined && precision >= 0) {
      value = Number(value.toFixed(precision))
    }

    if (min !== undefined && value < min) {
      value = min
    }

    if (max !== undefined && value > max) {
      value = max
    }

    return value
  }

  valueToNumber = (value: string) => {
    const parser = this.props.parser || this.defaultParser
    let tempValue = parser(value)

    if (isNaN(tempValue)) {
      tempValue = this.lastValidValue
    } else {
      this.lastValidValue = tempValue
    }

    return this.toValidValue(tempValue)
  }

  valueToString = (value?: number | string) => {
    const formatter = this.props.formatter || this.defaultFormatter
    return formatter(value || 0)
  }

  onChange = (e: React.ChangeEvent<any>, value: string) => {
    this.setState({value})

    const onChange = Base.action(this.props.onChange)
    onChange(e, this.valueToNumber(value))
  }

  onFocus = (e: React.FormEvent<any>) => {
    this.focused = true

    const onFocus = Base.action(this.props.onFocus)
    onFocus(e)
  }

  onBlur = (e: React.FormEvent<any>) => {
    this.focused = false

    const onBlur = Base.action(this.props.onBlur)
    onBlur(e)

    const value = this.valueToNumber(this.state.value).toString()
    this.setState({value})
  }

  onStep = (e: React.MouseEvent<any>, value: number) => {
    value = this.valueToNumber(value.toString())
    this.setState({value: value.toString()})

    const onChange = Base.action(this.props.onChange)
    onChange(e, value)
  }

  onStepUp = (e: React.MouseEvent<any>) => {
    const {value = 0, step = 1} = this.props
    this.onStep(e, (value + step))
  }

  onStepDown = (e: React.MouseEvent<any>) => {
    const {value = 0, step = 1} = this.props
    this.onStep(e, (value - step))
  }

  onStartStepUpTimer = (e: React.MouseEvent<any>) => {
    this.delayTimer = setTimeout(() => {
      this.stepTimer = setInterval(() => {
        this.onStepUp(e)
      }, TIMER_INTERVAL)
    }, TIMER_DELAY)
  }

  onStartStepDownTimer = (e: React.MouseEvent<any>) => {
    this.delayTimer = setTimeout(() => {
      this.stepTimer = setInterval(() => {
        this.onStepDown(e)
      }, TIMER_INTERVAL)
    }, TIMER_DELAY)
  }

  onClearTimer = () => {
    clearTimeout(this.delayTimer)
    clearTimeout(this.stepTimer)
  }

  renderHandlers = () => {
    return (
      <div className='bui-input-number__handlers'>
        <div
          className='bui-input-number__handler-up'
          onClick={this.onStepUp}
          onMouseDown={this.onStartStepUpTimer}
          onMouseUp={this.onClearTimer}
        />
        <div
          className='bui-input-number__handler-down'
          onClick={this.onStepDown}
          onMouseDown={this.onStartStepDownTimer}
          onMouseUp={this.onClearTimer}
        />
      </div>
    )
  }

  render () {
    const {showHandlers = true, disabled, onChange, onFocus, onBlur, ...rest} = this.props
    const value = this.state.value

    return (
      <Input
        {...rest}
        className={this.className('bui-input-number')}
        value={this.valueToString(value)}
        disabled={disabled}
        suffix={!disabled && showHandlers && this.renderHandlers()}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }
}
