import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as CSSTransition from 'react-transition-group/CSSTransition'
import * as TransitionGroup from 'react-transition-group/TransitionGroup'

import Base, {MessageType} from '../../common/Base'
import * as overlayUtil from '../../utils/overlay'
import * as stringUtil from '../../utils/string'
import Message from './Message'

let instance: MessageGroup | null
let container: HTMLElement | null

interface IMessageItem {
  key: string
  options: IMessageOptions
}

interface IMessageGroupProps {
  onEmpty: () => void
}

interface IMessageGroupState {
  items: IMessageItem[]
}

class MessageGroup extends Base<IMessageGroupProps, IMessageGroupState> {

  state: IMessageGroupState = {
    items: []
  }

  add = (options: IMessageOptions) => {
    const item = {key: stringUtil.randomKey(), options}
    this.setState({items: [item, ...this.state.items]})
  }

  remove = (item: any) => {
    this.setState({items: this.state.items.filter((i) => i !== item)})
  }

  onHide = () => {
    if (this.state.items.length === 0) {
      this.props.onEmpty()
    }
  }

  render () {
    const items = this.state.items

    return (
      <TransitionGroup className='bui-message-group'>
        {items.map((item) => (
          <CSSTransition
            key={item.key}
            classNames='bui-message-group__item'
            timeout={300}
            onExited={this.onHide}
          >
            <div className='bui-message-group__item'>
              <Message {...item.options} children={item.options.content} onClose={() => this.remove(item)}/>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

export interface IMessageOptions {
  type?: MessageType
  icon?: string
  content?: string
  duration?: number
  closable?: boolean
}

function destroy () {
  if (instance && container) {
    ReactDOM.unmountComponentAtNode(container)
    overlayUtil.remove(container)
    instance = null
    container = null
  }
}

export function message (options: IMessageOptions) {
  if (!instance) {
    container = overlayUtil.create()
    instance = ReactDOM.render(
      React.createElement(MessageGroup, {onEmpty: destroy}),
      container
    )
  }

  if (options.duration === undefined) {
    options.duration = 3000
  }

  if (options.closable === undefined) {
    options.closable = true
  }

  instance.add(options)
}

export function info (content: string, duration?: number, closable?: boolean) {
  return message({type: 'primary', content, duration, closable})
}

export function success (content: string, duration?: number, closable?: boolean) {
  return message({type: 'success', content, duration, closable})
}

export function warning (content: string, duration?: number, closable?: boolean) {
  return message({type: 'warning', content, duration, closable})
}

export function danger (content: string, duration?: number, closable?: boolean) {
  return message({type: 'danger', content, duration, closable})
}
