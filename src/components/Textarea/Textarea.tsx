import './Textarea.less'

import * as React from 'react'

import Base, {SizeType} from '../../common/Base'

export interface ITextareaProps {
  value?: string
  placeholder?: string
  size?: SizeType
  disabled?: boolean
  full?: boolean
  autoFocus?: boolean
  onChange?: (e: React.ChangeEvent<any>, value: string) => void
  onFocus?: React.FormEventHandler<any>
  onBlur?: React.FormEventHandler<any>
  onKeyDown?: React.FormEventHandler<any>
}

export default class Textarea extends Base<ITextareaProps> {

  autoFocus = (el: HTMLTextAreaElement) => {
    if (this.props.autoFocus && el) {
      el.focus()
    }
  }
  
  onChange: React.ChangeEventHandler<any> = (e: React.ChangeEvent<any>) => {
    const onChange = Base.action(this.props.onChange)
    onChange(e, e.target.value)
  }

  render () {
    const {size = 'normal', disabled, full, value, placeholder, onFocus, onBlur, onKeyDown} = this.props

    const className = this.className(
      'bui-textarea',
      `bui-textarea--${size}`,
      {
       ' bui-textarea--disabled': disabled,
       ' bui-textarea--full': full
      }
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        <textarea
          placeholder={placeholder}
          value={value}
          className='bui-textarea__original'
          disabled={disabled}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}/>
      </div>
    )
  }
}
