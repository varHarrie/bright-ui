import './Calendar.less'

import * as React from 'react'

import Base from '../../libs/Base'
import Icon from '../Icon'
import CalendarCell from './components/CalendarCell'
import DatePanel from './components/DatePanel'
import MonthPanel from './components/MonthPanel'
import YearPanel from './components/YearPanel'
import {monthNames} from './locale'

export enum viewTypes {
  YEAR = 0,
  MONTH = 1,
  DATE = 2
}

export interface ICalendarProps {
  value?: [Date, Date] | Date | null
  type?: 'date' | 'range'
  firstDayOfWeek?: number,
  onChange?: (start: Date, end?: Date) => void
}

export interface ICalendarState {
  status: viewTypes
  year: number
  month: number
  value: Date | null
  valueEnd: Date | null
}

export default class Calendar extends Base<ICalendarProps, ICalendarState> {

  constructor (props: ICalendarProps) {
    super(props)

    const value = props.value || null
    const current = value
      ? Array.isArray(value)
      ? value[0]
      : value
      : new Date()

    this.state = {
      status: viewTypes.DATE,
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      value: Array.isArray(value) ? value[0] : value,
      valueEnd: Array.isArray(value) && props.type === 'range'
        ? value[1]
        : null
    }
  }

  componentWillReceiveProps ({value = null, type}: ICalendarProps) {
    if (value !== this.props.value) {
      this.setState({
        value: Array.isArray(value) ? value[0] : value,
        valueEnd: Array.isArray(value) && type === 'range'
          ? value[1]
          : null
      })
    }
  }

  onPrevious = () => {
    switch (this.state.status) {
      case viewTypes.DATE:
        const month = this.state.month - 1
        if (month < 1) {
          this.setState({year: this.state.year - 1, month: 12})
        } else {
          this.setState({month})
        }
        break
      case viewTypes.MONTH:
        this.setState({year:  this.state.year - 1})
        break
      case viewTypes.YEAR:
        this.setState({year: this.state.year - 12})
        break
      default:
        break
    }
  }

  onReturn = () => {
    switch (this.state.status) {
      case viewTypes.DATE:
        this.setState({status: viewTypes.MONTH})
        break
      case viewTypes.MONTH:
        this.setState({status: viewTypes.YEAR})
        break
      default:
        break
    }
  }

  onNext = () => {
    switch (this.state.status) {
      case viewTypes.DATE:
        const month = this.state.month + 1
        if (month > 12) {
          this.setState({year: this.state.year + 1, month: 1})
        } else {
          this.setState({month})
        }
        break
      case viewTypes.MONTH:
        this.setState({year: this.state.year + 1})
        break
      case viewTypes.YEAR:
        this.setState({year: this.state.year + 12})
        break
      default:
        break
    }
  }

  onSelectYear = (year: number) => {
    this.setState({
      year,
      status: viewTypes.MONTH
    })
  }

  onSelectMonth = (month: number) => {
    this.setState({
      month,
      status: viewTypes.DATE
    })
  }

  onSelectDate = (value: Date, valueEnd: Date) => {
    const onChange = Base.action(this.props.onChange)

    if (!('value' in this.props)) {
      this.setState({value, valueEnd})
    }

    if (this.props.type === 'date') {
      onChange(value)
    } else {
      onChange(value, valueEnd)
    }
  }

  renderTitle = () => {
    const  {status, year, month} = this.state
    switch (status) {
      case viewTypes.DATE:
        return `${year}年 ${monthNames[month - 1]}`
      case viewTypes.MONTH:
        return `${year}年`
      case viewTypes.YEAR:
        return `${year - 12} - ${year + 12}`
      default:
        return ''
    }
  }

  render () {
    const {type = 'date', firstDayOfWeek} = this.props
    const {status, year, month, value, valueEnd} = this.state

    return (
      <div
        className={this.className('bui-calendar')}
        style={this.style()}
      >
        <div className='bui-calendar__header'>
          <CalendarCell onClick={this.onPrevious}><Icon name='angle-left'/></CalendarCell>
          <CalendarCell className='bui-calendar__title' onClick={this.onReturn}>
            {this.renderTitle()}
          </CalendarCell>
          <CalendarCell onClick={this.onNext}><Icon name='angle-right'/></CalendarCell>
        </div>
        <div className='bui-calendar__body'>
          <div className='bui-calendar__slider' style={{left: status * -100 + '%'}}>
            <YearPanel year={year} value={value} onSelect={this.onSelectYear}/>
            <MonthPanel value={value} onSelect={this.onSelectMonth}/>
            <DatePanel
              type={type}
              firstDayOfWeek={firstDayOfWeek}
              year={year}
              month={month}
              value={value}
              valueEnd={valueEnd}
              onSelect={this.onSelectDate}/>
          </div>
        </div>
      </div>
    )
  }
}
