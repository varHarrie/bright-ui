import './Button.less'

import * as React from 'react'

import Base, {RadiusType, ButtonColorType} from '../../commons/Base'
import Icon from '../Icon'
import ButtonGroup from './ButtonGroup'

export interface IButtonProps {
  size?: 'small' | 'normal' | 'large'
  type?: ButtonColorType
  nativeType?: 'button' | 'submit' | 'reset'
  basic?: boolean
  icon?: string
  disabled?: boolean
  loading?: boolean
  full?: boolean
  radius?: RadiusType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<any> | void
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>
}

export interface IButtonState {
  loading: boolean
}

export default class Button extends Base<IButtonProps, IButtonState> {

  static Group = ButtonGroup

  static defaultProps: IButtonProps = {
    size: 'normal',
    type: 'default',
    basic: false,
    nativeType: 'button'
  }

  constructor (props: IButtonProps) {
    super(props)

    this.state = {
      loading: !!props.loading
    }
  }

  componentWillReceiveProps (nextProps: IButtonProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({loading: !!nextProps.loading})
    }
  }

  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const onClick = Base.action(this.props.onClick)

    const promise = onClick(e)

    if (promise instanceof Promise) {
      this.setState({loading: true})
      promise.then(() => {
        if (this._isMounted) {
          this.setState({loading: false})
        }
      })
    }
  }

  render () {
    const {
      disabled, basic, size, type, full, icon, nativeType, radius, children,
      onMouseDown, onMouseUp, onMouseEnter, onMouseLeave
    } = this.props
    const {loading} = this.state

    const className = this.className(
      'bui-button',
      {
        [`bui-button--${size}`]: !!size,
        [`bui-button--${type}`]: !!type,
        'bui-button--basic': basic,
        'bui-button--loading': loading,
        'bui-button--full': full,
        'bui-button--disabled': disabled,
        'bui-button--only-icon': !children && !!icon
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
      <button
        className={className}
        style={this.style({borderRadius})}
        disabled={disabled || loading}
        type={nativeType}
        onClick={this.onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {loading && <Icon name='circle-o-notch' spinning fit/>}
        {!loading && icon && <Icon name={icon} fit/>}
        {children && <span>{children}</span>}
      </button>
    )
  }
}
