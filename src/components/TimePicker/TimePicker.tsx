import './TimePicker.less'

import * as React from 'react'

import Base from '../../common/Base'
import * as dateUtil from '../../utils//date'
import Input from '../Input'
import Popover from '../Popover/Popover'
import CellList from './CellList'

export type TimeType = {hours?: number, minutes?: number, seconds?: number}
export type ValueType = Date | string | TimeType | null

export interface ITimePickerProps {
  value?: ValueType
  format?: string
  disabled?: boolean
  full?: boolean
  onChange?: (value: string, values?: TimeType | null) => void
  onKeyDown?: React.FormEventHandler<any>
}

export interface ITimePickerState {
  visible: boolean
  value: string
  values?: TimeType | null
}

export default class TimePicker extends Base <ITimePickerProps, ITimePickerState> {

  static defaultProps = {
    format: 'HH:mm:ss'
  }

  hoursVisible: boolean
  minutesVisible: boolean
  secondsVisible: boolean

  constructor (props: ITimePickerProps) {
    super(props)

    const format = props.format as string

    this.hoursVisible = format.indexOf('H') > -1
    this.minutesVisible = format.indexOf('m') > -1
    this.secondsVisible = format.indexOf('s') > -1

    const values = this.parse(props.value)

    this.state = {
      visible: false,
      value: this.stringify(values),
      values
    }
  }

  componentWillReceiveProps ({value}: ITimePickerProps) {
    if (value !== this.state.value || value !== this.state.values) {
      const values = this.parse(value)
      this.setState({
        value: this.stringify(values),
        values
      })
    }
  }

  parse = (value?: ValueType) => {
    if (value instanceof Date) {
      return {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds()
      }
    } else if (typeof value === 'string') {
      return dateUtil.parse(value, this.props.format)
    }

    return value
  }

  stringify = (values?: TimeType | null) => {
    return values && (
        values.hours !== undefined ||
        values.minutes !== undefined ||
        values.seconds !== undefined
      )
        ? dateUtil.stringify(values, this.props.format)
        : ''
  }

  updateValue = (values?: TimeType | null) => {
    const oldValues = this.parse(this.state.value)
    const newValues = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      ...oldValues,
      ...values
    }
    this.setState({
      value: this.stringify(newValues),
      values: newValues
    }, () => {
      const onChange = Base.action(this.props.onChange)
      onChange(this.state.value, this.state.values)
    })
  }

  onVisibleChange = (visible: boolean) => {
    this.setState({visible})

    if (!visible) {
      this.updateValue(this.state.values)
    }
  }

  onValueChangeFromInput = (e: any, value: string) => {
    this.setState({value})
  }

  onHoursChange = (hours: number) => {
    this.updateValue({hours})
  }

  onMinutesChange = (minutes: number) => {
    this.updateValue({minutes})
  }

  onSecondsChange = (seconds: number) => {
    this.updateValue({seconds})
  }

  render () {
    const {full, disabled, onKeyDown} = this.props
    const {visible, value, values} = this.state
    const {hours = undefined, minutes = undefined, seconds = undefined} = values || {}

    const className = this.className(
      'bui-time-picker',
      {
        'bui-time-picker--full': full,
        'bui-time-picker--disabled': disabled
      }
    )

    return (
      <Popover
        narrow
        visible={visible}
        trigger='focus'
        placement='bottom'
        showArrow={false}
        onMouseDown={Base.preventDefault}
        onChange={this.onVisibleChange}
        content={(
          <div className='bui-time-picker__popover'>
            {this.hoursVisible && <CellList count={24} selectedNum={hours} onChange={this.onHoursChange}/>}
            {this.minutesVisible && <CellList count={60} selectedNum={minutes} onChange={this.onMinutesChange}/>}
            {this.secondsVisible && <CellList count={60} selectedNum={seconds} onChange={this.onSecondsChange}/>}
          </div>
        )}>
        <Input
          className={className}
          style={this.style()}
          suffix='clock-o'
          onChange={this.onValueChangeFromInput}
          onKeyDown={onKeyDown}
          value={value}/>
      </Popover>
    )
  }
}
