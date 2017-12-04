import './Container.less'

import * as React from 'react'

import Base from '../../libs/Base'

export interface IContainerProps {
  xs?: number | 'auto' | 'fixed'
  full?: boolean
}

export default class Container extends Base<IContainerProps> {
  render () {
    const {children, xs = 'fixed', full} = this.props

    const className = this.className(
      'bui-container',
      {
        'bui-container--full': full,
        [`bui-container--${xs}`]: xs === 'auto' || xs === 'fixed'
      }
    )

    const style = this.style(typeof xs === 'number' ? {width: xs + 'px'} : undefined)

    return (
      <div
        className={className}
        style={style}
      >
        {children}
      </div>
    )
  }
}
