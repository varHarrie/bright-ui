import './Loader.less'

import * as React from 'react'

import Base from '../../common/Base'

export interface ILoaderProps {
  text?: string
  full?: boolean
  loading?: boolean
  children?: React.ReactNode
}

export default class Loader extends Base<ILoaderProps> {

  renderChildren = () => {
    const children = this.props.children
    return typeof children === 'string'
      ? React.createElement('span', {}, children)
      : children as any || null
  }

  render () {
    const {loading, full, text, children} = this.props

    const className = this.className(
      'bui-loader',
      {
        'bui-loader--loading': loading,
        'bui-loader--full': full
      }
    )

    return (
      <div
        className={className}
        style={this.style()}
        data-text={text}
      >
        {children && <div className='bui-loader__container'>{children}</div>}
      </div>
    )
  }
}
