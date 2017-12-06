import './Checkbox.less'

import * as React from 'react'

import Base, {SizeType} from '../../common/Base'

export interface ICheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  value?: any
  size?: SizeType
  onChange?: (e: React.ChangeEvent<any>, checked: boolean, value?: any) => void
}

export interface ICheckboxState {
  checked: boolean
}

export default class Checkbox extends Base<ICheckboxProps, ICheckboxState> {

  static defaultProps = {
    size: 'normal'
  }

  constructor (props: ICheckboxProps) {
    super(props)
    this.state = {
      checked: !!props.checked
    }
  }

  componentWillReceiveProps ({checked = false}: ICheckboxProps) {
    if (this.props.checked !== checked) {
      this.setState({checked})
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {disabled, value} = this.props
    if (disabled) {
      return
    }

    const checked = e.target.checked
    const onChange = Base.action(this.props.onChange)

    if (!('checked' in this.props)) {
      this.setState({checked})
    }

    onChange(e, checked, value)
  }

  render () {
    const {disabled, size, indeterminate, children} = this.props
    const {checked} = this.state

    const className = this.className(
      'bui-checkbox',
      `bui-checkbox--${size}`,
      {
        'bui-checkbox--checked': checked,
        'bui-checkbox--indeterminate': indeterminate,
        'bui-checkbox--disabled': disabled
      }
    )

    return (
      <label
        className={className}
        style={this.style()}
      >
        <div className='bui-checkbox__header'>
          <input
            type='checkbox'
            className='bui-checkbox__original'
            checked={checked}
            disabled={disabled}
            onChange={this.onChange}
          />
        </div>
        <span className='bui-checkbox__content'>
          {children}
        </span>
      </label>
    )
  }
}
