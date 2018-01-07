import './Popover.less'

import * as React from 'react'

import Base from '../../commons/Base'
import BasePopover, {IBasePopoverProps} from '../../commons/BasePopover'
import PopoverConfirm from './PopoverConfirm'

export interface IPopoverProps extends IBasePopoverProps {
  title?: React.ReactNode
  width?: number
  showArrow?: boolean
  narrow?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>
}

export interface IPopoverState {}

export default class Popover extends Base<IPopoverProps, IPopoverState> {

  static Confirm = PopoverConfirm

  render () {
    const {
      showArrow = true,
      narrow,
      title,
      content,
      width,
      children,
      onClick,
      onMouseDown,
      onMouseUp,
      ...rest
    } = this.props

    const className = this.className(
      'bui-popover',
      {'bui-popover--narrow': narrow}
    )

    return (
      <BasePopover {...rest} content={(
        <div
          className={className}
          style={this.style({width})}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {showArrow && <div className='bui-popover__arrow' data-x-arrow={true}/>}
          {title && <div className='bui-popover__title'>{title}</div>}
          {content && <div className='bui-popover__content'>{content}</div>}
        </div>
      )}>
        {children}
      </BasePopover>
    )
  }
}
