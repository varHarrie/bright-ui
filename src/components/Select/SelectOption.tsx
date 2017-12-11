import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base from '../../common/Base'

export interface ISelectOptionProps {
  label: string
  value: any
}

export interface ISelectOptionState {}

export default class SelectOption extends Base<ISelectOptionProps, ISelectOptionState> {

  static contextTypes = {
    $select: PropTypes.any,
  }

  constructor (props: ISelectOptionProps, context: any) {
    super(props)

    const $select = context.$select
    
    if ($select && $select.state.value === props.value) {
      $select.select(props.label, props.value)
    }
  }

  onClick = () => {
    const $select = this.context.$select

    if (!$select) {
      return
    }

    const {label, value} = this.props

    $select.select(label, value)
  }

  render () {
    const {label, value, children} = this.props
    const $select = this.context.$select

    if (!$select) {
      return null
    }

    const selected = $select.state.value === value

    const className = this.className(
      'bui-select-option',
      {'bui-select-option--selected': selected}
    )

    return (
      <div
        className={className}
        style={this.style()}
        onClick={this.onClick}
      >
        {children || label}
      </div>
    )
  }
}
