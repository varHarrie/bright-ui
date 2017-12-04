import './Icon.less'

import * as React from 'react'

import Base, {IconColorType} from '../../libs/Base'
import * as cn from 'classnames'

const colors = ['normal', 'gray', 'primary', 'success', 'warning', 'danger']

export interface IIconProps {
  name?: string
  spinning?: boolean
  fit?: boolean
  clickable?: boolean
  color?: IconColorType
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export default class Icon extends Base<IIconProps> {
  render () {
    const {name, color = 'normal', fit, spinning, children, clickable, onClick} = this.props

    if (!name && !children) {
      return null
    }

    const colorClass = colors.indexOf(color) > -1 && `bui-icon--${color}`

    const className = this.className(
      'bui-icon',
      colorClass,
      {'bui-icon--clickable': !!(clickable || onClick)}
    )

    const style = this.style(colorClass ? undefined : {color})

    const iconClassName = cn({
      [`fa fa-${name}`]: !!name,
      'fa-fw': !!fit,
      'fa-spin': !!spinning
    })

    return (
      <span
        className={className}
        style={style}
        onClick={onClick}
      >
        {name && <i className={iconClassName}/>}
        {children !== undefined && <span className='bui-icon__text'>{children}</span>}
      </span>
    )
  }
}
