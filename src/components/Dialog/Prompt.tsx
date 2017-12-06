import * as React from 'react'

import Base, {SizeType} from '../../common/Base'
import Icon from '../Icon'
import Input from '../Input'
import Dialog from './Dialog'

export interface IPromptProps {
  visible?: boolean
  icon?: string
  title?: string
  value?: string
  placeholder?: string
  size?: SizeType
  closeOnMaskClick?: boolean
  container?: HTMLElement | (() => HTMLElement)
  autoDestroy?: boolean
  onConfirm?: (value: string) => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onClose?: () => void
  onHide?: () => void
}

export interface IPromptState {
  value: string
}

export default class Confirm extends Base<IPromptProps, IPromptState> {

  static defaultProps = {
    size: 'small',
    closeOnMaskClick: false
  }

  constructor (props: IPromptProps) {
    super(props)

    this.state = {
      value: props.value || ''
    }
  }

  componentWillReceiveProps ({value = ''}: IPromptProps) {
    if (value !== this.props.value) {
      this.setState({value})
    }
  }

  onValueChange = (e: any, value: string) => {
    this.setState({value})
  }

  onConfirm = () => {
    const onConfirm = Base.action(this.props.onConfirm)

    return onConfirm(this.state.value)
  }

  render () {
    const {
      visible,
      icon,
      title,
      placeholder,
      size,
      closeOnMaskClick,
      children,
      container,
      autoDestroy,
      onCancel,
      onClose,
      onHide
    } = this.props
    const {value} = this.state

    return (
      <Dialog
        className={this.className('bui-prompt')}
        style={this.style()}
        plain
        visible={visible}
        size={size}
        closeOnMaskClick={closeOnMaskClick}
        container={container}
        autoDestroy={autoDestroy}
        onConfirm={this.onConfirm}
        onCancel={onCancel}
        onClose={onClose}
        onHide={onHide}
      >
        {icon && (
          <div className='bui-prompt__left'>
            <Icon color='blue' name={icon}/>
          </div>
        )}
        <div className='bui-prompt__right'>
          <div className='bui-prompt__title'>{title}</div>
          {children && <div className='bui-prompt__desc'>{children}</div>}
          <Input
            className='bui-prompt__input'
            full
            autoFocus
            value={value}
            placeholder={placeholder}
            onChange={this.onValueChange}/>
        </div>
      </Dialog>
    )
  }
}
