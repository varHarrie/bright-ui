import './PopoverConfirm.less'

import * as React from 'react'

import Base, {ButtonColorType} from '../../commons/Base'
import Button from '../Button'
import Popover, {IPopoverProps} from './Popover'

export interface IPopoverConfirmProps extends IPopoverProps {
  confirmType?: ButtonColorType
  cancelType?: ButtonColorType
  confirmText?: string
  cancelText?: string
  confirmIcon?: string
  cancelIcon?: string
  onConfirm?: (e: React.MouseEvent<any>) => void
  onCancel?: (e: React.MouseEvent<any>) => void
}

export interface IPopoverConfirmState {
  visible: boolean
}

export default class PopoverConfirm extends Base<IPopoverConfirmProps, IPopoverConfirmState> {
  static defaultProps: IPopoverConfirmProps = {
    confirmType: 'primary',
    confirmText: '确定',
    cancelText: '取消'
  }

  constructor (props: IPopoverConfirmProps) {
    super(props)

    this.state = {
      visible: !!props.visible
    }
  }

  componentWillReceiveProps ({visible = false}: IPopoverConfirmProps) {
    if (visible !== this.props.visible) {
      this.setState({visible})
    }
  }

  onChange = (visible: boolean) => {
    const onChange = Base.action(this.props.onChange)
    onChange(visible)

    this.setState({visible})
  }

  onConfirm = (e: any) => {
    const onConfirm = Base.action(this.props.onConfirm)
    onConfirm(e)

    this.onChange(false)
  }

  onCancel = (e: any) => {
    const onCancel = Base.action(this.props.onCancel)
    onCancel(e)

    this.onChange(false)
  }

  render () {
    const {
      confirmType, confirmText, confirmIcon,
      cancelType, cancelText, cancelIcon,
      onConfirm, onCancel,
      content, ...rest
    } = this.props

    const visible = this.state.visible

    const className = this.className(
      'bui-popover-confirm'
    )

    const confirmProps = {
      size: 'small' as any,
      type: confirmType,
      icon: confirmIcon,
      children: confirmText,
      onClick: this.onConfirm
    }

    const cancelProps = {
      basic: true,
      size: 'small' as any,
      type: cancelType,
      icon: cancelIcon,
      children: cancelText,
      onClick: this.onCancel
    }

    return (
      <Popover
        {...rest}
        className={className}
        style={this.style()}
        visible={visible}
        onChange={this.onChange}
        content={(
          <div>
            <div className='bui-popover-confirm__content'>
              {content}
            </div>
            <div className='bui-popover-confirm__actions'>
              {confirmText && <Button {...confirmProps}/>}
              {cancelText && <Button {...cancelProps}/>}
            </div>
          </div>
        )}
      />
    )
  }
}
