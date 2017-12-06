import * as cn from 'classnames'
import * as React from 'react'
import * as stringUtil from '../../utils/string'

import ScrollBar from '../ScrollBar'

export interface ICellListProps {
  count: number
  step?: number
  selectedNum?: number
  onChange: (num: number) => void
}

export interface ICellListState {}

export default class CellList extends React.Component<ICellListProps, ICellListState> {

  $scrollBar: ScrollBar

  cells: number[]

  constructor (props: ICellListProps) {
    super(props)

    const {count, step = 1} = props
    const realStep = ~~step || 1
    const realCount = ~~(count / realStep) || 1

    this.cells = Array(realCount).fill(0).map((_, i) => i * realStep)
  }

  componentWillReceiveProps (nextProps: ICellListProps) {
    if (this.$scrollBar) {
      this.$scrollBar.scrollTo(24 * (nextProps.selectedNum || 0))
    }
  }

  saveScrollBar = (el: any) => {
    this.$scrollBar = el

    if (el) {
      el.scrollTo(24 * (this.props.selectedNum || 0))
    }
  }

  onChange = (e: any, num: number) => {
    this.props.onChange(num)
  }

  render () {
    const {selectedNum} = this.props

    return (
      <ScrollBar
        className='bui-time-picker__cells'
        ref={this.saveScrollBar}
        scrollStep={72}
      >
        {this.cells.map((i) => (
          <Cell
            key={i}
            num={i}
            selected={i === selectedNum}
            onClick={this.onChange}/>
        ))}
      </ScrollBar>
    )
  }
}

interface ICellProps {
  num: number
  selected?: boolean
  onClick?: (e: any, num: number) => any
}

function Cell ({num, selected, onClick}: ICellProps) {

  const className = cn(
    'bui-time-picker__cell',
    {'bui-time-picker__cell--selected': selected}
  )

  return (
    <div className={className} onClick={(e) => onClick && onClick(e, num)}>
      {stringUtil.padStart(num, 2, '0')}
    </div>
  )
}
