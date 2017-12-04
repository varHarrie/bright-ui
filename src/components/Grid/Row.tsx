import './Row.less'

import * as React from 'react'

import Base from '../../libs/Base'

export interface IRowProps {
  gutter?: number
}

export default class Row extends Base<IRowProps> {

  render () {
    const {gutter = 0, children} = this.props
    const space = gutter > 0 ? gutter / 2 : 0
    const rowStyle = space > 0 ? {marginLeft: -space, marginRight: -space} : undefined
    const colStyle = space > 0 ? {paddingLeft: space, paddingRight: space} : undefined

    const cols = React.Children.map(children, (col: React.ReactElement<any>) => {
      return React.cloneElement(col, {style: colStyle})
    })

    return (
      <div
        className={this.className('bui-row')}
        style={this.style(rowStyle)}
      >
        {cols}
      </div>
    )
  }
}
