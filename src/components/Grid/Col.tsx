import './Col.less'

import * as React from 'react'

import Base from '../../common/Base'

export interface IColProps {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export default class Col extends Base<IColProps> {

  render () {
    const {span = 1, children, ...sizes} = this.props

    const sizeClasses = ['xs', 'sm', 'md', 'lg', 'xl']
      .map((size) => typeof sizes[size] === 'number' && `bui-col-${size}-${sizes[size]}`)
      .filter((size) => !!size)

    if (!sizeClasses.length) {
      sizeClasses.push(`bui-col-${span}`)
    }

    const className = this.className(
      'bui-col',
      sizeClasses
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {children}
      </div>
    )
  }
}
