import './Tooltip.less'

import * as React from 'react'

import Base from '../../libs/Base'
import BasePopover, {IBasePopoverProps} from '../../libs/BasePopover'

export interface ITooltipProps extends IBasePopoverProps {
  color?: 'dark' | 'light'
  zIndex?: number
  showArrow?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
}

export default class Tooltip extends Base<ITooltipProps> {

  render () {
    const {
      placement = 'top',
      trigger = 'hover',
      color = 'dark',
      showArrow = true,
      content,
      children,
      zIndex,
      onClick,
      onMouseDown,
      onMouseUp,
      ...rest
    } = this.props

    const className = this.className(
      'bui-tooltip',
      `bui-tooltip--${color}`
    )

    return (
      (
        <BasePopover
          {...rest}
          placement={placement}
          trigger={trigger}
          content={(
            <div
              className={className}
              style={this.style({zIndex})}
              onClick={onClick}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            >
              {showArrow && <div className='bui-tooltip__arrow' data-x-arrow={true}/>}
              {content && <div className='bui-tooltip__content'>{content}</div>}
            </div>
          )}
        >
          {children}
        </BasePopover>
      )
    )
  }
}
