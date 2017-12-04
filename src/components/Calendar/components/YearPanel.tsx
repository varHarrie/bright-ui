import * as React from 'react'

import CalendarCell from './CalendarCell'

export interface IYearPanelProps {
  year: number,
  value?: Date | null,
  onSelect?: (year: number) => void
}

export interface IYearPanelState {}

export default class YearPanel extends React.Component<IYearPanelProps, IYearPanelState> {

  checkSelected = (year: number) => {
    const value = this.props.value
    return !!value && value.getFullYear() === year
  }

  onSelect = (year: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(year)
    }
  }

  renderYears = () => {
    const {year: focusedYear} = this.props
    const currentYear = (new Date()).getFullYear()
    const radius = 12
    const begin = focusedYear - radius
    const end = focusedYear + radius
  
    const years: number[] = []
    for (let i = begin; i <= end; i ++) {
      years.push(i)
    }
  
    return years.map((year) => (
      <CalendarCell
        key={year}
        type={currentYear === year ? 'current' : undefined}
        status={this.checkSelected(year) && 'selected'}
        onClick={() => this.onSelect(year)}
      >{year}</CalendarCell>
    ))
  }

  render () {
    return (
      <div className='bui-calendar__year-panel'>
        {this.renderYears()}
      </div>
    )
  }
}
