import * as cn from 'classnames'
import * as React from 'react'

export interface IPaginationItemProps {
  tip?: any
  className?: string
  active?: boolean
  disabled?: boolean
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function PaginationItem ({
  tip,
  className,
  active,
  disabled,
  children,
  onClick
}: IPaginationItemProps) {
  const classNames = cn(
    'bui-pagination__item',
    className,
    {
      'bui-pagination__item--active': active,
      'bui-pagination__item--disabled': disabled
    }
  )

  return (
    <div className={classNames} title={tip} onClick={disabled ? undefined : onClick}>
      {children}
    </div>
  )
}
