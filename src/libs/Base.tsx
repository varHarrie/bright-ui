import * as React from 'react'
import * as classnames from 'classnames'

export type CN = typeof classnames

export const noop = () => {/* Do nothing */}

export function action <T extends Function> (func?: T): T {
  return func || noop as any
}

export function promiseAction <T extends Function> (func?: T) {
  const f: any = func || noop

  return (...args: any[]) => (
    before: null | (() => any),
    after: null | ((data: any) => any),
    otherwise?: () => void
  ) => {
    const promise = f(...args)
    if (promise instanceof Promise) {
      if (before) {
        before()
      }
      return promise.then(after)
    } else if (otherwise) {
      otherwise()
    }

    return
  }
}

export interface IBaseProps {
  className?: string,
  style?: React.CSSProperties
}

export default abstract class Base<P = {}, S = {}> extends React.Component<P & IBaseProps, S> {
  static action = action

  static promiseAction = promiseAction

  static stopPropagation: React.EventHandler<any> = (e) => {
    e.stopPropagation()
  }

  static preventDefault: React.MouseEventHandler<any> = (e) => {
    e.preventDefault()
  }

  _isMounted: boolean = false

  className: CN = (...classes) => {
    return classnames(classes, this.props.className)
  }

  style = (style?: React.CSSProperties) => {
    return Object.assign({}, style, this.props.style)
  }

  componentDidMount () {
    this._isMounted = true
  }
  
  componentWillUnmount () {
    this._isMounted = false
  }
}

export type SizeType = 'small' | 'normal' | 'large'

export type ColorType = 'primary' | 'success' | 'warning' | 'danger' | 'gray'

export type RadiusType = number | 'circle' | 'square'

export type DirectionType = 'vertical' | 'horizontal'

export type ButtonColorType = 'default' | 'plain' | 'primary' | 'success' | 'warning' | 'danger' | 'white' | 'black'

export type IconColorType = 'normal' | 'primary' | 'success' | 'warning' | 'danger' | 'gray' | string

export type MessageType = 'primary' | 'success' | 'warning' | 'danger'

export type NotificationType = 'primary' | 'success' | 'warning' | 'danger'

export type PopoverTriggerType = 'click' | 'hover' | 'focus'

export type PopoverPlacementType =
  'auto' |
  'top' | 'top-start' | 'top-end' |
  'left' | 'left-start' | 'left-end' |
  'right' | 'right-start' | 'right-end' |
  'bottom' | 'bottom-start' | 'bottom-end'

export type TagColorType = 'gray' | 'primary' | 'success' | 'warning' | 'danger' | string
