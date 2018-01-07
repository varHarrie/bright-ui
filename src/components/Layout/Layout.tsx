import * as React from 'react'
import Base from '../../commons/Base'
import './Layout.less'

const margins = {
  'horizontal': 'marginRight',
  'horizontal-reverse': 'marginLeft',
  'vertical': 'marginBottom',
  'vertical-reverse': 'marginTop'
}

export interface ILayoutProps {
  direction?: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse'
  centered?: boolean
  full?: boolean
  gutter?: number
  header?: React.ReactNode
  footer?: React.ReactNode
}

export default class Layout extends Base<ILayoutProps> {

  render () {
    const {header, footer, children, centered, full, direction = 'vertical', gutter} = this.props
    const gutterStyle = (gutter && children) ? {[margins[direction]]: gutter} : undefined

    const className = this.className(
      'bui-layout',
      `bui-layout--${direction}`,
      {
        'bui-layout--centered': centered,
        'bui-layout--full': full
      }
    )

    return (
      <div
        className={className}
        style={this.style()}
      >
        {header && <div className='bui-layout__header' style={gutterStyle}>{header}</div>}
        {children && <div className='bui-layout__container'>{children}</div>}
        {footer && <div className='bui-layout__footer'>{footer}</div>}
      </div>
    )
  }
}
