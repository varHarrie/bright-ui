import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base from '../../commons/Base'
import Select, {ISelectOption} from './Select'

export interface ISelectOptionProps extends ISelectOption {}

export interface ISelectOptionState {}

export default class SelectOption extends Base<ISelectOptionProps, ISelectOptionState> {

  static contextTypes = {
    $select: PropTypes.any,
  }

  $select?: Select

  constructor (props: ISelectOptionProps, context: any) {
    super(props)

    if (context.$select) {
      this.$select = context.$select
    }
  }

  componentWillMount () {
    if (this.$select) {
      this.$select.addOption(this)
    }
  }

  componentWillUnmount () {
    if (this.$select) {
      this.$select.removeOption(this)
    }
  }

  onClick = () => {
    if (this.$select) {
      const {label, value} = this.props

      this.$select.select(label, value)
    }
  }

  render () {
    const {label, value, children} = this.props
    const $select = this.$select

    if (!$select || !$select.isMatched(label)) {
      return null
    }

    const className = this.className(
      'bui-select__option',
      {
        'bui-select__option--selected': $select.isSelected(value)
      }
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
