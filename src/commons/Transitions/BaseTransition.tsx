import * as cn from 'classnames'
import * as React from 'react'
import Transition, {EndHandler, EnterHandler, ExitHandler} from 'react-transition-group/Transition'

const DURATION = 300

export interface IOriginalTransitionProps {
  timeout?: number | { enter?: number, exit?: number }
  in?: boolean
  appear?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  addEndListener?: EndHandler
  onEnter?: EnterHandler
  onEntering?: EnterHandler
  onEntered?: EnterHandler
  onExit?: ExitHandler
  onExiting?: ExitHandler
  onExited?: ExitHandler
}

export interface IBaseTransitionProps extends IOriginalTransitionProps {
  duration?: number | { enter?: number, exit?: number }
  classNames?: {
    entering?: string
    entered?: string
    exiting?: string
    exited?: string
  } | ((state: string, children: any, el?: HTMLElement) => string)
  styles?: {
    entering?: React.CSSProperties
    entered?: React.CSSProperties
    exiting?: React.CSSProperties
    exited?: React.CSSProperties
  } | ((state: string, children: any, duration: number, el?: HTMLElement) => React.CSSProperties)
}

export interface IBaseTransitionState {}

export default class BaseTransition extends React.Component<IBaseTransitionProps, IBaseTransitionState> {

  el?: HTMLElement

  saveEl = (el?: HTMLElement) => {
    this.el = el
  }

  getDuration = (state: string) => {
    const duration = this.props.duration || DURATION

    return typeof duration === 'number'
      ? duration
      : duration[state] || DURATION
  }

  getClassName = (state: string, children: any) => {
    const classNames = this.props.classNames || {}

    return cn(
      children.props && children.props.className,
      typeof classNames === 'function'
        ? classNames(state, children, this.el)
        : classNames[state]
    )
  }

  getStyle = (state: string, children: any) => {
    const duration = this.getDuration(state)
    const styles = this.props.styles || {}

    return Object.assign(
      {},
      children.props && children.props.style,
      typeof styles === 'function'
        ? styles(state, children, duration, this.el)
        : styles[state]
    )
  }

  ensureElement = (children: any): any => {
    return typeof children === 'string'
      ? <div>{children}</div>
      : children
  }

  render () {
    const {classNames, styles, children, duration, ...rest} = this.props

    const timeout = this.props.timeout || {enter: 0, exit: this.getDuration('exit')}

    if (!children) {
      return null
    }

    return (
      <Transition timeout={timeout} {...rest}>
        {(state: string) => (
          React.cloneElement(
            this.ensureElement(children),
            {
              ref: this.saveEl,
              className: this.getClassName(state, children),
              style: this.getStyle(state, children)
            }
          )
        )}
      </Transition>
    )
  }
}
