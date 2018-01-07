import './ButtonGroup.less'

import * as React from 'react'

import Base, {DirectionType} from '../../commons/Base'

export interface IButtonGroupProps {
  full?: boolean
  direction?: DirectionType
}

export default class ButtonGroup extends Base<IButtonGroupProps> {
  render () {
    const {children, full, direction = 'horizontal'} = this.props

    const className = this.className(
      'bui-button-group',
      `bui-button-group--${direction}`,
      {'bui-button-group--full': full}
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
