import './InputGroup.less'

import * as React from 'react'

import Base from '../../commons/Base'

export interface IInputGroupProps {
  full: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
}

export interface IInputGroupState {}

export default class InputGroup extends Base<IInputGroupProps, IInputGroupState> {

  render () {
    const {full, header, children, footer} = this.props

    const className = this.className(
      'bui-input-group',
      {'bui-input-group--full': full}
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {header && <div className='bui-input-group__header'>{header}</div>}
        {children}
        {footer && <div className='bui-input-group__footer'>{footer}</div>}
      </div>
    )
  }
}
