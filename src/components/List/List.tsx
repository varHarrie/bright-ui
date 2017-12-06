import './List.less'

import * as React from 'react'

import Base, {SizeType} from '../../common/Base'
import ListItem from './ListItem'

export interface IListProps {
  title?: React.ReactNode
  size?: SizeType
}

export default class List extends Base<IListProps> {

  static Item = ListItem

  render () {
    const {title, size = 'normal', children} = this.props

    const className = this.className(
      'bui-list',
      `bui-list--${size}`
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {title && <div className='bui-list__title'>{title}</div>}
        {children}
      </div>
    )
  }
}
