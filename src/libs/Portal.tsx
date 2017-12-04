import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OverlayManager from './overlay-manager'

export interface IPortalProps {
  container?: HTMLElement | (() => HTMLElement)
  autoDestroy?: boolean
}

export default class Portal extends React.Component<IPortalProps> {

  static defaultProps = {
    autoDestroy: true
  }

  container: HTMLElement

  componentWillMount () {
    const container = this.props.container
    this.container = typeof container === 'function'
      ? container()
      : container || OverlayManager.create()
  }

  componentWillUnmount () {
    if (this.container && this.props.autoDestroy) {
      OverlayManager.remove(this.container)
      this.container = null as any
    }
  }

  render () {
    return ReactDOM.createPortal(
      this.props.children,
      this.container
    )
  }
}
