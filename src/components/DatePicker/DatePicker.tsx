import './DatePicker.less'

import * as React from 'react'

import Base, {PopoverTriggerType, SizeType} from '../../common/Base'
import * as dateUtil from '../../utils/date'
import Calendar from '../Calendar'
import Input from '../Input'
import Popover from '../Popover'

export interface IDatePickerProps {
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

export interface IDatePickerState {
  visible: boolean
  value: string
  date: Date | null
}

export default class DatePicker extends Base<IDatePickerProps, IDatePickerState> {

  static defaultProps = {
    icon: 'calendar',
    format: 'YYYY-MM-DD',
    trigger: 'focus'
  }

  constructor (props: IDatePickerProps) {
    super(props)

    const date = this.parse(props.value) || null

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
    this.updateValue(date)
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
        onMouseDown={Base.preventDefault}
        onChange={this.onVisibleChange}
        content={(
          <div className='bui-date-picker__popover'>
            <Calendar value={date} onChange={this.onDateChange}/>
          </div>
        )}
      >
        {
          children && typeof children === 'function'
            ? children({value, date, disabled})
            : (
              <Input
                className={this.className('bui-date-picker')}
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
