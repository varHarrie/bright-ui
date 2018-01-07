import './DatetimePicker.less'

import * as React from 'react'

import Base, {PopoverTriggerType, SizeType} from '../../commons/Base'
import * as dateUtil from '../../utils/date'
import Calendar from '../Calendar'
import Input from '../Input'
import Popover from '../Popover'
import TimePicker from '../TimePicker'

export interface IDatetimePickerProps {
  icon?: string
  value?: Date | string | null
  format?: string
  placeholder?: string
  full?: boolean
  disabled?: boolean
  size?: SizeType
  trigger?: PopoverTriggerType
  onChange?: (date: Date | null, value: string) => void
  onKeyDown?: React.FormEventHandler<any>
  onFocus?: React.FormEventHandler<any>
  onBlur?: React.FormEventHandler<any>
  children?: (data: {value: string, date: Date | null, disabled?: boolean}) => React.ReactNode
}

export interface IDatetimePickerState {
  visible: boolean
  value: string
  date: Date | null
}

export default class DatetimePicker extends Base<IDatetimePickerProps, IDatetimePickerState> {

  static defaultProps = {
    icon: 'calendar',
    format: 'YYYY-MM-DD HH:mm:ss',
    trigger: 'focus'
  }

  timeFormat: string

  constructor (props: IDatetimePickerProps) {
    super(props)

    const date = this.parse(props.value) || null

    this.timeFormat = (props.format as string).indexOf('s') > -1 ? 'HH:mm:ss' : 'HH:mm'

    this.state = {
      visible: false,
      value: this.stringify(date),
      date
    }
  }

  parse = (value?: Date | string | null) => {
    return typeof value === 'string'
      ? dateUtil.toDate(dateUtil.parse(value, this.props.format))
      : value || null
  }

  stringify = (date?: Date | null) => {
    return date ? dateUtil.stringify(date, this.props.format) : ''
  }

  updateValue = (date?: Date) => {
    const d = this.parse(date || this.state.value)
    const value = this.stringify(d)

    this.setState({
      value,
      date: d
    }, () => {
      const onChange = Base.action(this.props.onChange)
      onChange(this.state.date, this.state.value)
    })
  }

  onVisibleChange = (visible: boolean) => {
    this.setState({visible})

    if (!visible && this.state.value) {
      this.updateValue()
    }
  }

  onValueChangeFromInput = (e: any, value: string) => {
    this.setState({value})
  }

  onDateChange = (date: Date) => {
    const newDate = dateUtil.copyOrCreate(this.state.date, {hours: 0, minutes: 0, seconds: 0})

    newDate.setFullYear(date.getFullYear())
    newDate.setMonth(date.getMonth())
    newDate.setDate(date.getDate())

    this.updateValue(newDate)
  }

  onTimeChange = (value: string, values: any) => {
    const {hours = 0, minutes = 0, seconds = 0} = values || {}

    const newDate = dateUtil.copyOrCreate(this.state.date)

    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    newDate.setSeconds(seconds)

    this.updateValue(newDate)
  }

  render () {
    const {trigger, icon, placeholder, full, size, disabled, onKeyDown, onFocus, onBlur, children} = this.props
    const {visible, value, date} = this.state

    return (
      <Popover
        narrow
        visible={!disabled && visible}
        trigger={trigger}
        placement='bottom'
        showArrow={false}
        onChange={this.onVisibleChange}
        content={(
          <div className='bui-datetime-picker__popover'>
            <div className='bui-datetime-picker__date'>
              <Calendar
                value={date}
                onChange={this.onDateChange}/>
            </div>
            <div className='bui-datetime-picker__time'>
              <TimePicker
                full
                value={date}
                format={this.timeFormat}
                onFocus={(e) => {this.onVisibleChange(true)}}
                onChange={this.onTimeChange}/>
            </div>
          </div>
        )}
      >
        {
          children && typeof children === 'function'
            ? children({value, date, disabled})
            : (
              <Input
                className={this.className('bui-datetime-picker')}
                style={this.style()}
                full={full}
                size={size}
                disabled={disabled}
                suffix={icon}
                placeholder={placeholder}
                onChange={this.onValueChangeFromInput}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}/>
            )
        }
      </Popover>
    )
  }
}
