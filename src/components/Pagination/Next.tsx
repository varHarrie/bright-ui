import * as React from 'react'
import PaginationItem from './PaginationItem'

export interface INextProps {
  current: number
  total: number
  onClick: (page: number) => void
}

export default function Next ({total, current, onClick}: INextProps) {
  const disabled = current >= total

  return (
    <PaginationItem
      className='bui-pagination__next'
      disabled={disabled}
      onClick={() => onClick(current + 1)}
    >
      <i className='fa fa-fw fa-angle-right'/>
    </PaginationItem>
  )
}
