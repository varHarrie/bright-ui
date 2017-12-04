import './Avatar.less'

import * as React from 'react'

import Base, {RadiusType, SizeType} from '../../libs/Base'

export interface IAvatarProps {
  src?: string
  title?: string
  radius?: RadiusType
  size?: SizeType
}

export default class Avatar extends Base<IAvatarProps> {

  static defaultProps = {
    src: '',
    size: 'normal'
  }

  render () {
    const {src, title, radius, size} = this.props
    const className = this.className(
      'bui-avatar',
      `bui-avatar--${size}`
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
        className={className}
        style={this.style({borderRadius})}
      >
        <img className='bui-avatar__img' title={title} src={src}/>
      </div>
    )
  }
}
