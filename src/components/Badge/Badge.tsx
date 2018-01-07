import './Badge.less'

import * as React from 'react'

import Base, {ColorType} from '../../commons/Base'

export interface IBadgeProps {
  value?: number | string
  max?: number
  type?: ColorType
  dot?: boolean
  offset?: {top?: string, right?: string}
}

export default class Badge extends Base<IBadgeProps> {
  render () {
    const {value = 0, max = 99, type = 'danger', dot, children, offset = {}} = this.props
    const text = typeof value === 'number'
      ? (value > max ? max + '+' : value > 0 ? value : '')
      : value.trim()

    const el = dot
      ? <span className='bui-badge__dot' style={offset}/>
      : text
      ? <span className='bui-badge__count' style={offset}>{text}</span>
      : null
    
    const className = this.className(
      'bui-badge',
      `bui-badge--${type}`,
      {dot, float: !!children}
    )

    return (
      <span
        className={className}
        style={this.style()}
      >
        {children}
        {el}
      </span>
    )
  }
}
