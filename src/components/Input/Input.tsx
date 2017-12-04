import './Input.less'

import * as React from 'react'

import Base, {RadiusType} from '../../libs/Base'
import Icon from '../Icon'

export interface IInputProps {
  size?: 'small' | 'normal' | 'large'
  type?: 'text' | 'password'
  value?: string
  placeholder?: string
  disabled?: boolean
  full?: boolean
  radius?: RadiusType
  autoFocus?: boolean
  readOnly?: boolean
  prefix?: React.ReactNode | string
  suffix?: React.ReactNode | string
  onChange?: (e: React.ChangeEvent<any>, value: string) => void
  onFocus?: React.FormEventHandler<any>
  onBlur?: React.FormEventHandler<any>
  onKeyDown?: React.FormEventHandler<any>
}

export default class Input extends Base<IInputProps> {

  static defaultProps = {
    type: 'text',
    size: 'normal'
  }

  autoFocus = (el: HTMLInputElement) => {
    if (el && this.props.autoFocus) {
      el.focus()
    }
  }
  
  onChange: React.ChangeEventHandler<any> = (e: React.ChangeEvent<any>) => {
    const onChange = Base.action(this.props.onChange)
    onChange(e, e.target.value)
  }

  render () {
    const {
      type,
      size,
      readOnly,
      disabled,
      full,
      radius,
      prefix,
      suffix,
      value,
      placeholder,
      onFocus,
      onBlur,
      onKeyDown
    } = this.props

    const className = this.className(
      'bui-input',
      `bui-input--${size}`,
      {
        'bui-input--has-prefix': !!prefix,
        'bui-input--has-suffix': !!suffix,
        'bui-input--disabled': disabled,
        'bui-input--full': full
      }
    )

    const borderRadius = radius !== undefined && (
      radius === 'square'
      ? '0px'
      : radius === 'circle'
      ? '9999px'
      : radius + 'px'
    )

    const prefixEl = typeof prefix === 'string' ? <Icon fit name={prefix}/> : prefix
    const suffixEl = typeof suffix === 'string' ? <Icon fit name={suffix}/> : suffix

    return (
      <div
        className={className}
        style={this.style()}
      >
        {prefix && <div className='bui-input__prefix'>{prefixEl}</div>}
        <input
          ref={this.autoFocus}
          className='bui-input__original'
          style={{borderRadius}}
          type={type}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}/>
        {suffix && <div className='bui-input__suffix'>{suffixEl}</div>}
      </div>
    )
  }
}
