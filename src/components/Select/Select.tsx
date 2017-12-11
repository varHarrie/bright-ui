import './Select.less'

import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base, {SizeType} from '../../common/Base'
import SelectOption from './SelectOption'

export interface ISelectProps {
  size?: SizeType
  value?: any
  placeholder?: string
  onChange?: (value: any) => void
}

export interface ISelectState {
  label: string
  value: any
  visible: boolean
  keyword: string
}

export default class Select extends Base<ISelectProps, ISelectState> {

  static Option = SelectOption

  static childContextTypes = {
    $select: PropTypes.any
  }

  $root: HTMLDivElement
  $container: HTMLDivElement

  constructor (props: ISelectProps) {
    super(props)

    this.state = {
      label: '',
      value: props.value,
      visible: false,
      keyword: ''
    }
  }

  componentWillMount () {
    document.addEventListener('click', this.onClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onClickOutside)
  }

  getChildContext = () => {
    return {
      $select: this as any
    }
  }

  saveRoot = (el: any) => this.$root = el

  saveContainer = (el: any) => this.$container = el

  select = (label: string, value: any) => {
    this.setState({label, value})

    const onChange = Base.action(this.props.onChange)
    onChange(value)
  }

  onClickOutside = (e: MouseEvent) => {
    const el = e.target as any

    if (!el || !this.$root) {
      return
    }

    if (!this.$root.contains(el)) {
      this.setState({visible: false})
    }
  }

  onToggle = () => {
    this.setState({visible: !this.state.visible})
  }

  render () {
    const {size = 'normal', placeholder, children} = this.props
    const {visible, label} = this.state

    const className = this.className(
      'bui-select',
      `bui-select--${size}`,
      visible && 'bui-select--visible'
    )

    return (
      <div
        className={className}
        style={this.style()}
        ref={this.saveRoot}
      >
        <div className='bui-select__header' onClick={this.onToggle}>
          {label}
          {!label && (
            <div className='bui-select__placeholder'>{placeholder}</div>
          )}
        </div>
        <div className='bui-select__container' ref={this.saveContainer}>
          {children}
        </div>
      </div>
    )
  }
}
