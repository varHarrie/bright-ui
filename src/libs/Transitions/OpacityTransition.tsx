import * as React from 'react'

import BaseTransition, {IOriginalTransitionProps} from './BaseTransition'

export interface IOpacityTransitionProps extends IOriginalTransitionProps {
  in?: boolean
  duration?: number
  onExited?: () => void
}

export default class OpacityTransition extends React.Component<IOpacityTransitionProps> {

  getStyle = (state: string, children: any, duration: number) => {
    const style: any = {opacity: 0, transition: `opacity ${duration}ms`}

    if (state === 'entered') {
      style.opacity = 1
    }

    return style
  }

  render () {
    const {duration = 200, ...rest} = this.props

    return (
      <BaseTransition
        {...rest}
        appear
        duration={duration}
        styles={this.getStyle}/>
    )
  }
}
