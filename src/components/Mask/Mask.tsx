import './Mask.less'

import * as React from 'react'
import * as CSSTransition from 'react-transition-group/CSSTransition'

import Base from '../../libs/Base'

export interface IMaskProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  visible?: boolean
  fixed?: boolean
}

export default class Mask extends Base<IMaskProps> {

  render () {
    const {visible, fixed, children} = this.props

    const className = this.className(
      'bui-mask',
      {'bui-mask--fixed': fixed}
    )

    return (
      <CSSTransition
        classNames='bui-mask'
        in={visible}
        appear
        mountOnEnter
        unmountOnExit
        timeout={300}>
        <div
          className={className}
          style={this.style()}
          onClick={this.props.onClick}
        >
          {children && <div className='bui-mask__content'>{children}</div>}
        </div>
      </CSSTransition>
    )
  }
}
