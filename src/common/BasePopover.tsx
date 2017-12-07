import Popper from 'popper.js'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as stringUtil from '../utils/string'
import Base, {PopoverPlacementType, PopoverTriggerType} from './Base'
import Portal from './Portal'
import OpacityTransition from './Transitions/OpacityTransition'

export interface IBasePopoverProps {
  visible?: boolean
  disabled?: boolean
  trigger?: PopoverTriggerType
  placement?: PopoverPlacementType
  content?: React.ReactNode
  onChange?: (visible: boolean) => void
}

export interface IBasePopoverState {
  visible?: boolean
  portalVisible: boolean
}

export default class BasePopover extends Base<IBasePopoverProps, IBasePopoverState> {

  static defaultProps = {
    placement: 'top',
    trigger: 'click'
  }

  static childContextTypes = {
    $popover: PropTypes.any
  }

  static contextTypes = {
    $popover: PropTypes.any
  }

  state = {
    visible: false,
    portalVisible: false
  }

  id: string = stringUtil.randomKey()
  $target: Element | null
  $popper: Element | null
  instance: Popper | null

  hideTimer: number

  getChildContext = () => {
    return {
      $popover: this as any
    }
  }

  componentDidMount () {
    super.componentDidMount()
    this.updateVisible(this.props.visible, true)
  }

  componentWillReceiveProps ({visible}: IBasePopoverProps) {
    this.clearHideTimer()
    this.updateVisible(visible, true)
  }

  updateVisible = (visible?: boolean, force?: boolean) => {
    if (this.props.disabled && !force) {
      return
    }

    if (visible) {
      document.addEventListener('click', this.onClickOutside)
    } else {
      document.removeEventListener('click', this.onClickOutside)
    }

    if (this._isMounted) {
      this.setState({
        visible,
        portalVisible: visible || this.state.portalVisible
      })
    }
  }

  saveTarget = ($target: any) => {
    this.$target = $target
      ? ReactDOM.findDOMNode($target)
      : null
  }

  refPopper = ($popper: any) => {
    const {placement} = this.props
    const $target = this.$target
    this.$popper = $popper

    if ($popper && $target) {
      this.instance = new Popper(
        $target,
        $popper,
        {
          placement,
          modifiers: {arrow: {element: '[data-x-arrow]'}}
        },
      )
    } else if (this.instance) {
      this.instance.destroy()
    }
  }

  ensureElement = (children: any): any => {
    return typeof children === 'string'
      ? <span>{children}</span>
      : children
  }

  getEvents = (children: React.SFCElement<any>) => {
    const trigger = this.props.trigger
    const props = children.props || {}

    switch (trigger) {
      case 'click':
        return {onClick: Base.actions(this.onToggle, props.onClick)}

      case 'hover':
        return {
          onMouseEnter: Base.actions(this.onShow, props.onMouseEnter),
          onMouseLeave: Base.actions(this.onDelayedHide, props.onMouseLeave)
        }

      case 'focus':
        return {
          onFocus: Base.actions(this.onShow, props.onFocus),
          onBlur: Base.actions(this.onDelayedHide, props.onBlur)
        }

      default:
    }

    return {}
  }

  clearHideTimer = () => {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer)
      delete this.hideTimer
    }
  }

  onMouseDownInside = (e: React.MouseEvent<any>) => {
    const target: any = e.target

    if (target && target.focus) {
      target.focus()
    }
  }

  onClickOutside = (e: MouseEvent) => {
    const el = e.target as any
    const {$target, $popper} = this

    if (!el || !$target || !$popper) {
      return
    }

    if ($target.contains(el) || $popper.contains(el)) {
      return
    }

    // 嵌套检测，目前仅实现两层
    const popper = el.closest('[data-popover-parent-id]')
    const parentId = popper && popper.getAttribute('data-popover-parent-id')

    if (parentId === this.id) {
      return
    }

    this.onHide(e)
  }

  onToggle = (e: React.MouseEvent<any>, visible: boolean = !this.state.visible) => {
    if (e) {
      e.stopPropagation()
    }

    const onChange = Base.action(this.props.onChange)
    onChange(visible)

    if (!('visible' in this.props)) {
      this.updateVisible(visible)
    }
  }

  onShow = (e: any) => {
    this.clearHideTimer()
    this.onToggle(e, true)
  }

  onHide = (e: any) => {
    this.onToggle(e, false)
  }

  onDelayedHide = (e: any) => {
    if (e) {
      e.persist()
    }

    this.hideTimer = setTimeout(() => {
      this.onHide(e)
      delete this.hideTimer
    }, 300)
  }
  
  onHideIfNeeded = (e: any) => {
    if (this.props.trigger === 'hover') {
      this.onDelayedHide(e)
    }
  }

  onHidePortal = () => {
    this.setState({portalVisible: false})
  }

  render () {
    const {content, children} = this.props
    const {visible, portalVisible} = this.state

    if (!children) {
      return null
    }

    const id = this.id
    const parentId = this.context.$popover && this.context.$popover.id

    const realChildren = this.ensureElement(children)

    const target = React.cloneElement(
      realChildren,
      {
        key: 'target',
        ref: this.saveTarget,
        ...this.getEvents(realChildren)
      }
    )

    const popper = React.cloneElement(
      this.ensureElement(content),
      {
        ref: this.refPopper,
        onMouseEnter: this.clearHideTimer,
        onMouseLeave: this.onHideIfNeeded,
        onMouseDown: this.onMouseDownInside
      }
    )

    const wrap = portalVisible && (
      <Portal key='wrap'>
        <OpacityTransition
          in={visible}
          onExited={this.onHidePortal}>
          <div
            data-popover-id={id}
            data-popover-parent-id={parentId}>{popper}</div>
        </OpacityTransition>
      </Portal>
    )

    return [target, wrap]
  }
}
