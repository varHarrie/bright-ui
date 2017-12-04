import * as React from 'react'
import * as CSSTransition from 'react-transition-group/CSSTransition'

import Mask from '../components/Mask'
import Base from './Base'
import Portal from './Portal'

export interface IBaseDialogProps {
  visible?: boolean
  masked?: boolean
  closeOnEsc?: boolean
  closeOnMaskClick?: boolean
  transition?: string
  container?: HTMLElement | (() => HTMLElement)
  autoDestroy?: boolean
  onClose?: () => void
  onHide?: () => void
}

export interface IBaseDialogState {
  portalVisible: boolean
}

export default class BaseDialog extends Base<IBaseDialogProps, IBaseDialogState> {

  static defaultProps = {
    transition: 'scale'
  }

  constructor (props: IBaseDialogProps) {
    super(props)

    this.state = {
      portalVisible: !!props.visible
    }
  }

  componentDidMount () {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.onKeyDown as any)
    }
  }

  componentWillReceiveProps ({visible}: IBaseDialogProps) {
    if (!this.props.visible && visible) {
      this.setState({portalVisible: true})
    }
  }

  componentWillUnmount () {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.onKeyDown as any)
    }
  }

  onKeyDown = (e: React.KeyboardEvent<any>) => {
    const {onClose} = this.props
    if (e.keyCode === 27 && onClose) {
      e.stopPropagation()
      onClose()
    }
  }

  onMaskClick = (e: React.MouseEvent<any>) => {
    const {closeOnMaskClick, onClose} = this.props
    if (closeOnMaskClick && onClose) {
      e.stopPropagation()
      onClose()
    }
  }

  onHidePortal = () => {
    this.setState({portalVisible: false})
    
    const onHide = Base.action(this.props.onHide)
    onHide()
  }

  render () {
    const {visible, transition, masked, container, autoDestroy, children} = this.props
    const {portalVisible} = this.state

    if (!portalVisible) {
      return null
    }

    return (
      <Portal
        container={container}
        autoDestroy={autoDestroy}
      >
        {masked && (
          <Mask
            fixed
            key='mask'
            visible={visible}
            onClick={this.onMaskClick}/>
        )}
        <CSSTransition
          key='dialog'
          classNames={`bui-dialog-${transition}`}
          in={visible}
          appear
          mountOnEnter
          unmountOnExit
          timeout={300}
          onExited={this.onHidePortal}
        >
          {children}
        </CSSTransition>
      </Portal>
    )
  }
}
