import * as React from 'react'

import {monthNames} from '../locale'
import CalendarCell from './CalendarCell'

export interface IMonthPanelProps {
  value?: Date | null,
  onSelect?: (month: number) => void
}

export interface IMonthPanelState {}

export default class MonthPanel extends React.Component<IMonthPanelProps, IMonthPanelState> {

  onSelect = (month: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(month)
    }
  }

  checkSelected = (month: number) => {
    const value = this.props.value
    return !!value && value.getMonth() === month
  }

  renderMonths = () => {
    const currentMonth = (new Date()).getMonth()

    return monthNames.map((text, i) => (
      <CalendarCell
      key={i}
      type={currentMonth === i ? 'current' : undefined}
      status={this.checkSelected(i) && 'selected'}
      onClick={() => this.onSelect(i + 1)}
    >{text}</CalendarCell>
    ))
  }

  render () {
    return (
      <div className='bui-calendar__month-panel'>
        {this.renderMonths()}
      </div>
    )
  }
}
