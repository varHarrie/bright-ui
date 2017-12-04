import * as cn from 'classnames'
import * as React from 'react'

export interface ICalendarCellProps {
  className?: string
  type?: string
  status?: string | false
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
}

export default function CalendarCell ({
  className,
  type,
  status,
  children,
  onClick,
  onMouseEnter
}: ICalendarCellProps) {
  const classNames = cn(
    'bui-calendar__cell',
    type && `bui-calendar__cell--${type}`,
    status && `bui-calendar__cell--${status}`,
    className
  )

  return (
    <div className={classNames} onClick={onClick} onMouseEnter={onMouseEnter}>
      <span className='bui-calendar__cell-text'>{children}</span>
    </div>
  )
}
