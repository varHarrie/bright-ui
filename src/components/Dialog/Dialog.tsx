import './Dialog.less'

import * as React from 'react'

import Base, {ButtonColorType, SizeType} from '../../common/Base'
import BaseDialog from '../../common/BaseDialog'
import Button from '../Button'
import Icon from '../Icon'
import Confirm from './Confirm'
import functionalConfirm from './functional-confirm'
import functionalPrompt from './functional-prompt'
import Prompt from './Prompt'

export interface IDialogProps {
  size?: SizeType
  visible?: boolean
  plain?: boolean
  masked?: boolean
  closable?: boolean
  closeOnEsc?: boolean
  closeOnMaskClick?: boolean
  transition?: 'scale' | 'slide-up'
  container?: HTMLElement | (() => HTMLElement)
  autoDestroy?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
  icon?: string
  title?: React.ReactNode
  cancelIcon?: string
  confirmIcon?: string
  cancelType?: ButtonColorType
  confirmType?: ButtonColorType
  cancelText?: React.ReactNode
  confirmText?: React.ReactNode
  onConfirm?: () => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onClose?: () => void
  onHide?: () => void
}

export interface IDialogState {
  loading: boolean
}

export default class Dialog extends Base<IDialogProps, IDialogState> {

  static confirm = functionalConfirm

  static prompt = functionalPrompt

  static Confirm = Confirm

  static Prompt = Prompt

  static defaultProps = {
    size: 'normal',
    transition: 'scale',
    masked: true,
    closable: true,
    closeOnEsc: true,
    closeOnMaskClick: true,
    confirmIcon: 'check',
    cancelType: 'default',
    confirmType: 'primary',
    cancelText: '取消',
    confirmText: '确定'
  }

  state = {
    loading: false
  }

  onConfirm = () => {
    const onConfirm = Base.promiseAction(this.props.onConfirm)
    onConfirm()(
      () => this.setState({loading: true}),
      () => this._isMounted && this.setState({loading: false})
    )
  }

  onCancel = () => {
    const onCancel = Base.promiseAction(this.props.onCancel || this.props.onClose)
    onCancel()(
      () => this.setState({loading: true}),
      () => this._isMounted && this.setState({loading: false})
    )
  }

  renderHeader = () => {
    const {header, icon, title} = this.props

    if (!header && !icon && !title) {
      return null
    }

    if (header) {
      return (<div className='bui-dialog__header'>{header}</div>)
    }

    return (
      <div className='bui-dialog__header'>
        {(icon || title) && <Icon name={icon}>{title}</Icon>}
      </div>
    )
  }

  renderFooter = () => {
    const {footer, cancelText, confirmText, cancelIcon, confirmIcon, cancelType, confirmType} = this.props
    const {loading} = this.state

    if (footer === false) {
      return null
    }

    if (footer) {
      return (<div className='bui-dialog__footer'>{footer}</div>)
    }

    return (
      <div className='bui-dialog__footer'>
        <div className='bui-dialog__actions'>
          <Button
            basic
            type={cancelType}
            icon={cancelIcon}
            loading={loading}
            onClick={this.onCancel}>{cancelText}</Button>
          <Button
            type={confirmType}
            icon={confirmIcon}
            loading={loading}
            onClick={this.onConfirm}>{confirmText}</Button></div>
      </div>
    )
  }

  render () {
    const {
      size,
      plain,
      closable,
      children,
      visible,
      masked,
      closeOnEsc,
      closeOnMaskClick,
      transition,
      container,
      autoDestroy,
      onClose,
      onHide
    } = this.props
    const {loading} = this.state
    
    const className = this.className(
      'bui-dialog',
      `bui-dialog--${size}`,
      {'bui-dialog--plain': plain}
    )

    return (
      <BaseDialog
        visible={visible}
        masked={masked}
        closeOnEsc={closeOnEsc}
        closeOnMaskClick={closeOnMaskClick}
        transition={transition}
        container={container}
        autoDestroy={autoDestroy}
        onClose={onClose}
        onHide={onHide}
      >
        <div
          className={className}
          style={this.style()}
        >
          {this.renderHeader()}
          {children && <div className='bui-dialog__body'>{children}</div>}
          {this.renderFooter()}
          {closable && !loading && <span className='bui-dialog__close' onClick={onClose}>×</span>}
        </div>
      </BaseDialog>
    )
  }
}
