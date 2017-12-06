import './Pagination.less'

import * as React from 'react'

import Base from '../../common/Base'
import Goto from './Goto'
import Next from './Next'
import Pager from './Pager'
import Prev from './Prev'

export interface IPaginationProps {
  current?: number
  total?: number
  range?: number
  layout?: string[]
  onChange?: (page: number) => void
}

export interface IPaginationState {}

export default class Pagination extends Base<IPaginationProps, IPaginationState> {

  onChange = (page: number) => {
    const onChange = Base.action(this.props.onChange)
    onChange(page)
  }

  render () {
    const {layout = ['prev', 'pager', 'next'], current = 1, total = 0, range = 2} = this.props

    if (!total || total < 0) {
      return null
    }

    const template = {
      'prev': (
        <Prev
          key='prev'
          current={current}
          total={total}
          onClick={this.onChange}/>
      ),
      'next': (
        <Next
          key='next'
          current={current}
          total={total}
          onClick={this.onChange}/>
      ),
      'pager': (
        <Pager
          key='pager'
          current={current}
          total={total}
          range={range}
          onClick={this.onChange}/>
      ),
      'goto': (
        <Goto
          key='goto'
          current={current}
          total={total}
          onConfirm={this.onChange}/>
      )
    }

    return (
      <div
        className={this.className('bui-pagination')}
        style={this.style()}
      >
        {layout.map((name) => template[name])}
      </div>
    )
  }
}
