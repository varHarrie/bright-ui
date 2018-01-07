import './Divider.less'

import * as React from 'react'

import Base from '../../commons/Base'

export interface IDividerProps {
  direction?: 'horizontal' | 'vertical'
}

export default class Divider extends Base<IDividerProps> {

  static defaultProps = {
    direction: 'horizontal'
  }

  render () {
    const {direction, children} = this.props

    const className = this.className(
      'bui-divider',
      `bui-divider--${direction}`
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {children && (
          <span className='bui-divider__content'>{children}</span>
        )}
      </div>
    )
  }
}
