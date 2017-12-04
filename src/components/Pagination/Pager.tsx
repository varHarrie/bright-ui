import * as React from 'react'

import Base from '../../libs/Base'
import PaginationItem from './PaginationItem'

export interface IPagerProps {
  current: number,
  total: number,
  range: number,
  onClick: (page: number) => void
}

export default class Pager extends Base<IPagerProps> {

  getPages = () => {
    const {current, total, range} = this.props
    const pages = []

    let startPage = current - range
    let endPage = current + range

    if (startPage < 1) {
      startPage = 1
      endPage = startPage + range * 2

      if (endPage > total) {
        endPage = total
      }
    } else if (endPage > total) {
      endPage = total
      startPage = endPage - range * 2

      if (startPage < 1) {
        startPage = 1
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  render () {
    const {current, total, onClick} = this.props
    const pages = this.getPages()

    const jumpPrev = pages[0] - 1
    const jumpNext = pages[pages.length - 1] + 1

    return (
      <div className='bui-pagination__pager'>
        {jumpPrev >= 1 && (
          <PaginationItem
            key={1}
            onClick={() => onClick(1)}
          >
            {1}
          </PaginationItem>
        )}
        {jumpPrev > 1 && (
          <PaginationItem
            key={jumpPrev}
            tip={jumpPrev}
            onClick={() => onClick(jumpPrev)}
          >
            ...
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem
            key={page}
            active={page === current}
            onClick={() => onClick(page)}
          >
            {page}
          </PaginationItem>
        ))}
        {jumpNext < total && (
          <PaginationItem
            key={jumpNext}
            tip={jumpNext}
            onClick={() => onClick(jumpNext)}
          >
            ...
          </PaginationItem>
        )}
        {jumpNext <= total && (
          <PaginationItem
            key={total}
            onClick={() => onClick(total)}
          >
            {total}
          </PaginationItem>
        )}
      </div>
    )
  }
}
