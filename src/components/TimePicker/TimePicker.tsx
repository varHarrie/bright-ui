import './TimePicker.less'

import * as React from 'react'

import Base from '../../libs/Base'
import Input from '../Input'
import Popover from '../Popover/Popover'
import ScrollBar from '../ScrollBar/'
import * as utils from './utils'
import * as cn from 'classnames'

export type ValueType = Date | string | {hours?: number, minutes?: number, seconds?: number}

export interface ITimePickerProps {
  value?: ValueType
  format?: string
  disabled?: boolean
  full?: boolean
  onChange?: (value: string, hours: number, minutes: number, seconds: number) => void
  onFocus?: React.FormEventHandler<any>
  onBlur?: React.FormEventHandler<any>
  onKeyDown?: React.FormEventHandler<any>
}

export interface ITimePickerState {
  visible: boolean
  hours: number
  minutes: number
  seconds: number
}

export default class TimePicker extends Base <ITimePickerProps, ITimePickerState> {
  static defaultProps = {
    value: {hours: 0, minutes: 0, seconds: 0},
    format: 'HH:mm:ss'
  }

  scrollBars: any = {
    visible: false,
    hours: {},
    minutes: {},
    seconds: {}
  }

  constructor (props: ITimePickerProps) {
    super(props)

    const {value, format} = props as any
    const values = this.parseFromValue(value || {})

    this.scrollBars.hours.visible = format.indexOf('H') > -1
    this.scrollBars.minutes.visible = format.indexOf('m') > -1
    this.scrollBars.seconds.visible = format.indexOf('s') > -1

    this.state = {
      visible: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ...values
    }
  }

  componentWillReceiveProps ({value}: ITimePickerProps) {
    if (value !== this.props.value) {
      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        ...this.parseFromValue(value || {})
      })
    }
  }

  componentDidUpdate (prevProps: ITimePickerProps, prevState: ITimePickerState) {
    const {visible} = this.state

    if (visible && !prevState.visible) {
      const {hours: hoursBar, minutes: minutesBar, seconds: secondsBar} = this.scrollBars
      const {hours, minutes, seconds} = this.state
      const HEIGHT = 24 // todo: 通过ref动态获取高度

      if (hoursBar.el) {
        hoursBar.el.scrollTo(hours * HEIGHT)
      }
      if (minutesBar.el) {
        minutesBar.el.scrollTo(minutes * HEIGHT)
      }
      if (secondsBar.el) {
        secondsBar.el.scrollTo(seconds * HEIGHT)
      }
    }
  }

  parseFromValue = (value: ValueType) => {
    if (value instanceof Date) {
      return {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds()
      }
    } else if (typeof value === 'string') {
      return utils.parse(value, this.props.format) || {}
    }
    
    return value
  }

  isCellSelected = (name: string, value: number) => {
    return this.state[name] === value
  }

  onVisibleChange = (visible: boolean) => {
    this.setState({visible})
  }

  onUpdateValue = (name: string, el: HTMLDivElement) => {
    const num = el.getAttribute('data-num')
    this.scrollBars[name].el.scrollTo(el.offsetTop)
    this.setState({[name]: Number(num)} as any, () => {
      const onChange = Base.action(this.props.onChange)
      const {hours, minutes, seconds} = this.state
      const {format} = this.props
      const value = utils.stringify({hours, minutes, seconds}, format)
      onChange(value, hours, minutes, seconds)
    })
  }

  onUpdateHours = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.onUpdateValue('hours', e.target as HTMLDivElement)
  }

  onUpdateMinutes = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.onUpdateValue('minutes', e.target as HTMLDivElement)
  }

  onUpdateSeconds = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.onUpdateValue('seconds', e.target as HTMLDivElement)
  }

  renderCells = (name: string, num: number, onClick: any) => {
    const cells = Array(num).fill('0')

    return (
      <ScrollBar
        className='bui-time-picker__cells'
        ref={(el: any) => this.scrollBars[name].el = el}
        scrollStep={72}
      >
        {cells.map((_, i) => (
          <div
            key={i}
            className={
              cn(
                'bui-time-picker__cell',
                {'bui-time-picker__cell--selected': this.isCellSelected(name, i)}
              )
            }
            data-num={i}
            onClick={onClick}
          >
            {utils.padStart(i, 2)}
          </div>
        ))}
      </ScrollBar>
    )
  }

  render () {
    const {format, full, disabled, onFocus, onBlur, onKeyDown} = this.props
    const {visible, hours, minutes, seconds} = this.state

    const className = this.className(
      'bui-time-picker',
      {
        'bui-time-picker--full': full,
        'bui-time-picker--disabled': disabled
      }
    )

    const value: string = utils.stringify({hours, minutes, seconds}, format)

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
            {this.scrollBars.hours.visible && this.renderCells('hours', 24, this.onUpdateHours)}
            {this.scrollBars.minutes.visible && this.renderCells('minutes', 60, this.onUpdateMinutes)}
            {this.scrollBars.seconds.visible && this.renderCells('seconds', 60, this.onUpdateSeconds)}
          </div>
        )}>
        <Input
          className={className}
          style={this.style()}
          suffix='clock-o'
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={value}/>
      </Popover>
    )
  }
}
