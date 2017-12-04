import * as React from 'react'
import PaginationItem from './PaginationItem'

export interface IPrevProps {
  current: number
  total: number
  onClick: (page: number) => void
}

export default function Prev ({current, onClick}: IPrevProps) {
  const disabled = current < 2

  return (
    <PaginationItem
      className='bui-pagination__prev'
      disabled={disabled}
      onClick={() => onClick(current - 1)}
    >
      <i className='fa fa-fw fa-angle-left'/>
    </PaginationItem>
  )
}
