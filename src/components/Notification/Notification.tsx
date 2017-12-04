import './Notification.less'

import * as React from 'react'

import Base, {NotificationType} from '../../libs/Base'
import HeightTransition from '../../libs/Transitions/HeightTransition'
import Icon from '../Icon'

const iconMap = {
  primary: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-circle',
  danger: 'times-circle'
}

export interface INotificationProps {
  visible?: boolean
  type?: NotificationType
  icon?: string
  title?: string
  closable?: boolean
  duration?: number
  onClose?: () => void
  onHide?: () => void
}

export interface INotificationState {
  visible: boolean
}

export default class Notification extends Base<INotificationProps, INotificationState> {

  timer: number

  constructor (props: INotificationProps) {
    super(props)

    this.state = {
      visible: 'visible' in props ? !!props.visible : true
    }
  }

  componentDidMount () {
    this.startTimer()
  }

  componentWillReceiveProps ({visible = true}: INotificationProps) {
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
    const {type = 'primary', title, closable, onHide, children} = this.props
    const {visible} = this.state

    const icon = this.props.icon || iconMap[type]

    const className = this.className(
      'bui-notification',
      `bui-notification__${type}`,
      {'bui-notification--only-title': !children}
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
          {closable && <span className='bui-notification__close' onClick={this.onClose}>×</span>}
          {icon && <Icon className='bui-notification__icon' fit name={icon}/>}
          {(title || children) && (
            <div className='bui-notification__body'>
              {title && <div className='bui-notification__title'>{title}</div>}
              {children && <div className='bui-notification__content'>{children}</div>}
            </div>
          )}
        </div>
      </HeightTransition>
    )
  }
}
