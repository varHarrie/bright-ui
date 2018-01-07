import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base from '../../commons/Base'
import * as commonUtil from '../../utils/common'
import Form from './Form'
import {IValidationError} from './FormStore'

export interface IChildProps {
  value?: any
  name?: string
  error?: IValidationError | null
  onChange: (e: any, value: any) => void
  onValueChange: (value: any) => void
}

export interface IFormFieldProps {
  name?: string
  value?: any
  required?: boolean
  label?: React.ReactNode
  children: React.ReactNode | ((props: IChildProps) => React.ReactNode)
}

export interface IFormStateProps {
  error: IValidationError | null
}

export default class FormField extends Base<IFormFieldProps, IFormStateProps> {

  static contextTypes = {
    $form: PropTypes.any,
  }

  name: string
  $form: Form

  validateWithDebounce = commonUtil.debounce(() => this.validate(), 300)
  
  constructor (props: IFormFieldProps, context: any) {
    super(props)

    this.state = {
      error: null
    }

    const {name, value} = props
    const {$form} = context

    this.$form = $form

    if (name && $form) {
      if (value === undefined) {
        console.warn(`Warning: Form field '${name}' should provide a value, but got undefined.`)
      }

      this.name = name

      $form.$fields.push(this)
      $form.set(name, value)
    }
  }

  validate = () => {
    const error = this.$form.validate(this.name)
    this.setState({error})
    return error
  }

  onChange = (e: any, value: any) => {
    if (!this.$form) {
      return
    }

    this.$form.set(this.name, value)
    this.validateWithDebounce()
    this.forceUpdate()
  }

  onValueChange = (value: any) => {
    this.onChange(null, value)
  }

  renderChildren = () => {
    const {children} = this.props

    if (typeof children !== 'function') {
      return children
    }

    const name = this.name
    const error = this.state.error
    const value = (this.$form && name) ? this.$form.get(name) : undefined

    return children({
      name,
      value,
      error,
      onChange: this.onChange,
      onValueChange: this.onValueChange
    })
  }

  render () {
    const {label, required} = this.props
    const error = this.state.error as any

    const showError = !!(this.$form && this.$form.props.showError && error)
    const labelWidth = this.$form ? this.$form.props.labelWidth : undefined
    const labelStyle = labelWidth ? {width: labelWidth} : undefined

    const className = this.className(
      'bui-form-field',
      {'bui-form-field--has-error': showError}
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {label !== undefined && (
          <label className='bui-form-field__label' style={labelStyle}>
            {required && <span className='bui-form-field__mark'>*</span>}
            {label}
          </label>
        )}
        <div className='bui-form-field__content'>
          {this.renderChildren()}
          {showError && <div className='bui-form-field__error'>{error.message}</div>}
        </div>
      </div>
    )
  }
}
