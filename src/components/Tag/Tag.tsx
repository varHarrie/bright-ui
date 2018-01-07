import './Tag.less'

import * as React from 'react'

import Base, {RadiusType, SizeType, TagColorType} from '../../commons/Base'

const presetColors = ['gray', 'primary', 'success', 'warning', 'danger']

export interface ITagProps {
  size?: SizeType
  closable?: boolean
  clickable?: boolean
  radius?: RadiusType
  color?: TagColorType
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onClose?: React.MouseEventHandler<HTMLSpanElement>
}

export default class Tag extends Base<ITagProps> {

  static defaultProps = {
    size: 'normal',
    color: 'gray'
  }

  onClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    const onClose = Base.action(this.props.onClose)
    onClose(e)
  }

  render () {
    const {closable, radius, color = 'gray', size = 'normal', children, onClick} = this.props
    const clickable = !!this.props.clickable || !!onClick

    let colorClassName: any = ''
    let background: any = undefined

    if (presetColors.indexOf(color) > -1) {
      colorClassName = `bui-tag--${color}`
    } else {
      background = color
    }

    const className = this.className(
      'bui-tag',
      `bui-tag--${size}`,
      colorClassName,
      {
        'bui-tag--clickable': clickable,
        'bui-tag--closable': closable
      }
    )

    const borderRadius = radius !== undefined && (
      radius === 'square'
      ? '0px'
      : radius === 'circle'
      ? '9999px'
      : radius + 'px'
    )

    return (
      <div
        className={this.className(className)}
        style={this.style({background, borderRadius})}
        onClick={onClick}
      >
        {children}
        {closable && <span className='bui-tag__close' onClick={this.onClose}>×</span>}
      </div>
    )
  }
}
