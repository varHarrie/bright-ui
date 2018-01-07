import './Form.less'

import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base from '../../commons/Base'
import FormField from './FormField'
import FormStore, {IValidationError, IValidationMap, IValueMap} from './FormStore'

export interface IFormProps {
  layout?: 'horizontal' | 'vertical'
  labelWidth?: string | number
  validations?: IValidationMap
  showError?: boolean
  onSubmit?: (errors: IValidationError[] | null, values: IValueMap, reset: () => void) => void
}

export default class Form extends Base<IFormProps> {

  static Field = FormField

  static childContextTypes = {
    $form: PropTypes.any
  }

  static defaultProps = {
    layout: 'vertical',
    showError: true
  }

  store: FormStore

  $fields: FormField[] = []

  constructor (props: IFormProps) {
    super(props)

    this.store = new FormStore(props.validations)
  }

  getChildContext = () => {
    return {
      $form: this as any
    }
  }

  get = (name: string) => {
    return this.store.get(name)
  }

  set = (name: string, value: any) => {
    this.store.set(name, value)
  }

  validate = (name: string) => {
    return this.store.validate(name)
  }

  onReset = () => {
    this.store.reset()
    this.forceUpdate()
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const onSubmit = Base.action(this.props.onSubmit)
    const values = this.store.getValues()
    const errors = this.$fields
      .map(($field) => $field.validate())
      .filter((error) => !!error) as IValidationError[]

    onSubmit(errors.length ? errors : null, values, this.onReset)
  }

  render () {
    const {layout, children} = this.props

    const className = this.className(
      'bui-form',
      `bui-form--${layout}`
    )

    return (
      <form
        className={className}
        style={this.style()}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
      >
        {children}
      </form>
    )
  }
}
