import './SidePanel.less'

import * as React from 'react'
import * as CSSTransition from 'react-transition-group/CSSTransition'

import Base from '../../libs/Base'
import ScrollBar from '../ScrollBar'

export interface ISidePanelProps {
  header?: React.ReactNode
  placement?: 'left' | 'right'
  fixed?: boolean
  visible?: boolean
  width?: number | string
}

export default class SidePanel extends Base<ISidePanelProps> {

  static defaultProps = {
    placement: 'left',
    fixed: false,
    width: '700px'
  }

  render () {
    const {header, placement, fixed, width, visible, children} = this.props

    const className = this.className(
      'bui-side-panel',
      `bui-side-panel--${placement}`,
      {
        'bui-side-panel--fixed': fixed
      }
    )
    
    return (
        <CSSTransition
          classNames='bui-side-panel'
          in={visible}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <div
            className={className}
            style={this.style({width})}
          >
            {header && <div className='bui-side-panel__header'>{header}</div>}
            {children && <ScrollBar className='bui-side-panel__container'>{children}</ScrollBar>}
          </div>
        </CSSTransition>
    )
  }
}
