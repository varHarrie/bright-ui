import './Message.less'

import * as React from 'react'

import Base, {MessageType} from '../../common/Base'
import HeightTransition from '../../common/Transitions/HeightTransition'
import Icon from '../Icon'
import {danger, info, message, success, warning} from './functional-message'

const iconMap = {
  primary: 'info',
  success: 'check',
  warning: 'exclamation',
  danger: 'close'
}

export interface IMessageProps {
  visible?: boolean
  type?: MessageType
  icon?: string
  full?: boolean
  closable?: boolean
  duration?: number
  onClose?: () => void
  onHide?: () => void
}

export interface IMessageState {
  visible: boolean
}

export default class Message extends Base<IMessageProps, IMessageState> {

  static normal = message

  static info = info

  static success = success

  static warning = warning

  static danger = danger

  timer: number

  constructor (props: IMessageProps) {
    super(props)

    this.state = {
      visible: 'visible' in props ? !!props.visible : true
    }
  }

  componentDidMount () {
    this.startTimer()
  }

  componentWillReceiveProps ({visible = true}: IMessageProps) {
    if (visible !== this.props.visible) {
      this.setState({visible})
    }
  }
  
  componentWillUnmount () {
    this.clearTimer()
  }

  startTimer = () => {
    const duration = this.props.duration
    const onClose = Base.action(this.props.onClose)

    if (!this.timer && duration && duration > 0 && onClose) {
      this.timer = setTimeout(onClose, duration)
    }
  }

  clearTimer = () => {
    clearTimeout(this.timer)
    delete this.timer
  }

  onClose = () => {
    const onClose = this.props.onClose

    if (onClose) {
      onClose()
    } else if (!('visible' in this.props)) {
      this.setState({visible: false})
    }
  }

  render () {
    const {type = 'primary', full, closable, onHide, children} = this.props
    const {visible} = this.state

    const icon = this.props.icon || iconMap[type]

    const className = this.className(
      'bui-message',
      `bui-message__${type}`,
      {'bui-message--full': full}
    )

    return (
      <HeightTransition
        fade
        in={visible}
        onExited={onHide}
      >
        <div
          className={className}
          style={this.style()}
          onMouseEnter={this.clearTimer}
          onMouseLeave={this.startTimer}
        >
          {icon && <Icon className='bui-message__icon' fit name={icon}/>}
          {children && <div className='bui-message__content'>{children}</div>}
          {closable && <span className='bui-message__close' onClick={this.onClose}>×</span>}
        </div>
      </HeightTransition>
    )
  }
}
