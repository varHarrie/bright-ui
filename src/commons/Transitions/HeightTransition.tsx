import * as React from 'react'

import * as domUtil from '../../utils/dom'
import BaseTransition, {IOriginalTransitionProps} from './BaseTransition'

export interface IHeightTransitionProps extends IOriginalTransitionProps {
  fade?: boolean
  duration?: number
}

export interface IHeightTransitionState {}

export default class HeightTransition extends React.Component<IHeightTransitionProps, IHeightTransitionState> {

  originalStyle: any

  heightStyle = {
    'height': '0px',
    'paddingTop': '0px',
    'paddingBottom': '0px',
    'marginTop': '0px',
    'marginBottom': '0px'
  }

  getOriginalStyle = (el: HTMLElement) => {
    return {
      'height': domUtil.getStyle(el, 'height'),
      'paddingTop': domUtil.getStyle(el, 'padding-top'),
      'paddingBottom': domUtil.getStyle(el, 'padding-bottom'),
      'marginTop': domUtil.getStyle(el, 'margin-top'),
      'marginBottom': domUtil.getStyle(el, 'margin-bottom')
    }
  }

  getStyle = (state: string, children: string, duration: number, el?: HTMLElement) => {
    const fade = this.props.fade
    let style: any = {overflow: 'hidden'}

    if (el) {
      if (!this.originalStyle) {
        this.originalStyle = this.getOriginalStyle(el)
      }

      switch (state) {
        case 'entering':
          style = {...style, ...this.heightStyle}
          if (fade) style.opacity = 0
          break
  
        case 'entered':
          style = {...style, ...this.originalStyle}
          style.transition = `all ${duration}ms`
          if (fade) style.opacity = 1
          break
  
        case 'exiting':
          style = {...style, ...this.originalStyle}
          if (fade) style.opacity = 1
          break
  
        case 'exited':
          style = {...style, ...this.heightStyle}
          style.transition = `all ${duration}ms`
          if (fade) style.opacity = 0
          break
  
        default:
      }
    }

    return style
  }

  render () {
    const {fade, ...rest} = this.props

    return (
      <BaseTransition styles={this.getStyle} {...rest}/>
    )
  }
}
