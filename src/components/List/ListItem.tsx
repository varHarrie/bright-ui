import * as React from 'react'

import Base from '../../common/Base'

export interface IListItemProps {
  value?: any
  selected?: boolean
  header?: React.ReactNode
  actions?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement>, value: any) => void
}

export default class ListItem extends Base<IListItemProps> {

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const onClick = Base.action(this.props.onClick)
    onClick(e, this.props.value)
  }

  onClickActions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  render () {
    const {selected, children, header, actions} = this.props

    const className = this.className(
      'bui-list__item',
      {'bui-list__item--selected': selected}
    )

    return (
      <div
        className={className}
        style={this.style()}
        onClick={this.onClick}
      >
        {header && (
          <div className='bui-list__item-header'>{header}</div>
        )}
        {children && (
          <div className='bui-list__item-content'>{children}</div>
        )}
        {actions && (
          <div className='bui-list__item-actions' onClick={this.onClickActions}>{actions}</div>
        )}
      </div>
    )
  }
}
