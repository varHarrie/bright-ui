import './Segment.less'

import * as React from 'react'

import Base from '../../libs/Base'

export interface ISegmentProps {
  narrow?: boolean
  bordered?: boolean
  full?: boolean
  raised?: boolean
}

export default class Segment extends Base<ISegmentProps> {
  render () {
    const {children, bordered, narrow, full, raised} = this.props
    const className = this.className(
      'bui-segment',
      {
        'bui-segment--bordered': bordered,
        'bui-segment--narrow': narrow,
        'bui-segment--full': full,
        'bui-segment--raised': raised
      }
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
