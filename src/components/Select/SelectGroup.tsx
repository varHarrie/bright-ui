import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base from '../../common/Base'

export interface ISelectGroupProps {
  label?: string
}

export interface ISelectGroupState {}

export default class SelectOption extends Base<ISelectGroupProps, ISelectGroupState> {

  static contextTypes = {
    $select: PropTypes.any,
  }

  render () {
    const {label, children} = this.props
    const $select = this.context.$select

    if (!$select) {
      return null
    }

    return (
      <div
        className={this.className('bui-select__group')}
        style={this.style()}
      >
        {label && (
          <div className='bui-select__group-label'>{label}</div>
        )}
        {children}
      </div>
    )
  }
}
