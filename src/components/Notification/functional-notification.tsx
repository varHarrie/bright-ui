import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as CSSTransition from 'react-transition-group/CSSTransition'
import * as TransitionGroup from 'react-transition-group/TransitionGroup'

import Base, {NotificationType, NotificationPlacement} from '../../commons/Base'
import * as overlayUtil from '../../utils/overlay'
import * as stringUtil from '../../utils/string'
import Notification from './Notification'

type PlacementType = {instance: NotificationGroup | null, container: HTMLElement | null}

const placements: {[name: string]: PlacementType} = {
  'top-left': {instance: null, container: null},
  'top-right': {instance: null, container: null},
  'bottom-left': {instance: null, container: null},
  'bottom-right': {instance: null, container: null}
}

interface INotificationItem {
  key: string
  options: INotificationOptions
}

interface INotificationGroupProps {
  placement: NotificationPlacement
  onEmpty: (placement: NotificationPlacement) => void
}

interface INotificationGroupState {
  items: INotificationItem[]
}

class NotificationGroup extends Base<INotificationGroupProps, INotificationGroupState> {

  state: INotificationGroupState = {
    items: []
  }

  add = (options: INotificationOptions) => {
    const item = {key: stringUtil.randomKey(), options}
    this.setState({items: [...this.state.items, item]})
  }

  remove = (item: any) => {
    this.setState({items: this.state.items.filter((i) => i !== item)})
  }

  onHide = () => {
    if (this.state.items.length === 0) {
      this.props.onEmpty(this.props.placement)
    }
  }

  render () {
    const placement = this.props.placement
    const items = this.state.items

    const className = `bui-notification-group bui-notification-group--${placement}`

    return (
      <TransitionGroup className={className}>
        {items.map((item) => (
          <CSSTransition
            key={item.key}
            classNames='bui-notification-group__item'
            timeout={300}
            onExited={this.onHide}
          >
            <div className='bui-notification-group__item'>
              <Notification {...item.options} children={item.options.content} onClose={() => this.remove(item)}/>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

export interface INotificationOptions {
  type?: NotificationType
  icon?: string
  title?: string
  content?: string
  duration?: number
  closable?: boolean
  placement?: NotificationPlacement
}

function destroy (placement: NotificationPlacement) {
  const p = placements[placement]

  if (p && p.instance && p.container) {
    ReactDOM.unmountComponentAtNode(p.container)
    overlayUtil.remove(p.container)
    p.instance = null
    p.container = null
  }
}

export function open (options: INotificationOptions) {
  const {placement = 'top-right', ...rest} = options
  const p = placements[placement]

  if (!p) {
    return
  }

  if (!p.instance) {
    p.container = overlayUtil.create()
    p.instance = ReactDOM.render(
      React.createElement(NotificationGroup, {placement, onEmpty: destroy}),
      p.container
    )
  }

  if (rest.duration === undefined) {
    rest.duration = 5000
  }

  if (rest.closable === undefined) {
    rest.closable = true
  }

  p.instance.add(rest)
}

export function info (options: INotificationOptions) {
  return open({type: 'primary', ...options})
}

export function success (options: INotificationOptions) {
  return open({type: 'success', ...options})
}

export function warning (options: INotificationOptions) {
  return open({type: 'warning', ...options})
}

export function danger (options: INotificationOptions) {
  return open({type: 'danger', ...options})
}
