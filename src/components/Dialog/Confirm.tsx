import * as React from 'react'

import Base, {SizeType} from '../../libs/Base'
import Icon from '../Icon'
import Dialog from './Dialog'

export interface IConfirmProps {
  visible?: boolean
  icon?: string
  title?: string
  size?: SizeType
  closeOnMaskClick?: boolean
  container?: HTMLElement | (() => HTMLElement)
  autoDestroy?: boolean
  onConfirm?: () => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onClose?: () => void
  onHide?: () => void
}

export default class Confirm extends Base<IConfirmProps> {

  static defaultProps: IConfirmProps = {
    title: '确认',
    icon: 'question-circle',
    size: 'small',
    closeOnMaskClick: false
  }

  render () {
    const {
      visible,
      icon,
      title,
      size,
      closeOnMaskClick,
      children,
      container,
      autoDestroy,
      onConfirm,
      onCancel,
      onClose,
      onHide
    } = this.props

    return (
      <Dialog
        className={this.className('bui-confirm')}
        style={this.style()}
        plain
        visible={visible}
        size={size}
        closeOnMaskClick={closeOnMaskClick}
        container={container}
        autoDestroy={autoDestroy}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
        onHide={onHide}
      >
        {icon && (<div className='bui-confirm__left'>
          <Icon color='orange' name={icon}/>
        </div>)}
        <div className='bui-confirm__right'>
          <div className='bui-confirm__title'>{title}</div>
          <div className='bui-confirm__content'>{children}</div>
        </div>
      </Dialog>
    )
  }
}
