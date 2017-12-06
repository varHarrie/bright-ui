import * as addDays from 'date-fns/add_days'
import * as eachDay from 'date-fns/each_day'
import * as isSameDay from 'date-fns/is_same_day'
import * as startOfWeek from 'date-fns/start_of_week'
import * as React from 'react'

import Base from '../../../common/Base'
import {weekdayNames} from '../locale'
import CalendarCell from './CalendarCell'

export interface IDatePanelProps {
  type: 'date' | 'range'
  firstDayOfWeek?: number,
  year: number
  month: number
  value?: Date | null
  valueEnd?: Date | null
  onSelect?: (start: Date, end?: Date) => void
}

export interface IDatePanelState {
  value: Date | null
  valueEnd: Date | null
  selecting: boolean
}

export default class DatePanel extends Base<IDatePanelProps, IDatePanelState> {

  constructor (props: IDatePanelProps) {
    super(props)
    this.state = {
      value: props.value || null,
      valueEnd: props.valueEnd || null,
      selecting: false
    }
  }

  componentWillReceiveProps ({year, month, value = null, valueEnd = null}: IDatePanelProps) {
    if (this.state.value !== value || this.state.valueEnd !== valueEnd) {
      this.setState({value, valueEnd})
    }
  }

  checkSelected = (date: Date) => {
    return this.state.value && isSameDay(this.state.value, date)
      || this.state.valueEnd && isSameDay(this.state.valueEnd, date)
  }

  checkRanged = (date: Date) => {
    const {value, valueEnd} = this.state

    if (!value || !valueEnd) {
      return false
    }

    return value <= date && date <= valueEnd
      || valueEnd <= date && date <= value
  }

  onSelect = (date: Date) => {
    const onSelect = Base.action(this.props.onSelect)

    if (this.props.type === 'date') {
      onSelect(date)
    } else {
      const selecting = this.state.selecting
      const _value = this.state.value || date

      if (selecting) {
        const value = _value <= date ? _value : date
        const valueEnd = _value > date ? _value : date

        onSelect(value, valueEnd)
      } else {
        this.setState({value: date, valueEnd: null})
      }
      
      this.setState({selecting: !selecting})
    }
  }

  onMarkRange = (date: Date) => {
    if (!this.state.selecting) {
      return
    }

    this.setState({valueEnd: date})
  }

  renderWeekdays = () => {
    const {firstDayOfWeek = 1} = this.props
    const names = weekdayNames
      .slice(firstDayOfWeek - 1)
      .concat(weekdayNames.slice(0, firstDayOfWeek - 1))
    return names.map((name) => (
      <CalendarCell key={name}>{name}</CalendarCell>
    ))
  }

  renderDays = () => {
    const {year, month, firstDayOfWeek = 1} = this.props
    const beginMonthDate = new Date(year, month - 1, 1)
    const endMonthDate = new Date(year, month, 0)
    const beginDate = startOfWeek(beginMonthDate, {weekStartsOn: firstDayOfWeek})
    const today = new Date()

    const pastDates = (
      beginDate < beginMonthDate
      ? eachDay(beginDate, addDays(beginMonthDate, -1))
      : []
    ).map((date) => ({date, type: 'past'}))

    const monthDates = eachDay(beginMonthDate, endMonthDate)
      .map((date) => ({date, type: ''}))

    const futureDates = eachDay(
      addDays(endMonthDate, 1),
      addDays(endMonthDate, 42 - pastDates.length - monthDates.length)
    ).map((date) => ({date, type: 'future'}))

    return pastDates
      .concat(monthDates)
      .concat(futureDates)
      .map(({type, date}, index) => {
        const text = date.getDate()
        const status = (this.checkSelected(date) && 'selected')
          || (this.checkRanged(date) && 'ranged')
          || false

        return (
          <CalendarCell
            key={type + text}
            type={type}
            status={status}
            marked={isSameDay(date, today)}
            onClick={() => this.onSelect(date)}
            onMouseEnter={() => this.onMarkRange(date)}
          >{text}</CalendarCell>
        )
      })
  }

  render () {
    return (
      <div className='bui-calendar__date-panel'>
        <div className='bui-calendar__date-panel-header'>
          {this.renderWeekdays()}
        </div>
        <div className='bui-calendar__date-panel-body'>
          {this.renderDays()}
        </div>
      </div>
    )
  }
}
