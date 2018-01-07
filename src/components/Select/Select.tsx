import './Select.less'

import * as PropTypes from 'prop-types'
import * as React from 'react'

import Base, {SizeType} from '../../commons/Base'
import * as commonUtils from '../../utils/common'
import Icon from '../Icon'
import Input from '../Input'
import ScrollBar from '../ScrollBar'
import Tag from '../Tag'
import SelectGroup from './SelectGroup'
import SelectOption from './SelectOption'

export interface ISelectOption {
  label: string
  value: any
}

export interface ISelectProps {
  size?: SizeType
  multiple?: boolean
  searchable?: boolean
  value?: any | any[]
  placeholder?: string
  full?: boolean
  children: React.ReactElement<SelectOption>
          | React.ReactElement<SelectGroup>
          | React.ReactElement<SelectOption>[]
          | React.ReactElement<SelectGroup>[]
  onChange?: (value: any | any[]) => void
}

export interface ISelectState {
  selected: ISelectOption[]
  visible: boolean
  searchKey: string
}

export default class Select extends Base<ISelectProps, ISelectState> {

  static Option = SelectOption

  static Group = SelectGroup

  static childContextTypes = {
    $select: PropTypes.any
  }

  $root: HTMLDivElement

  constructor (props: ISelectProps) {
    super(props)

    this.state = {
      selected: [],

      visible: false,
      searchKey: ''
    }
  }

  saveRoot = (el: any) => this.$root = el

  options: SelectOption[] = []

  getChildContext = () => {
    return {
      $select: this as any
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.onClickOutside)

    this.setState({selected: this.parse(this.props.value)})
  }

  componentWillReceiveProps ({value}: ISelectProps) {
    if (value !== this.props.value) {
      this.setState({selected: this.parse(value)})
    }
  }

  // todo: using arrow keys to select
  // componentDidUpdate (prevProps: ISelectProps, prevState: ISelectState) {
  //   if (prevState.visible && !this.state.visible) {
  //     document.removeEventListener('keydown', this.onKeyDown)
  //   } else if (!prevState.visible && this.state.visible) {
  //     document.addEventListener('keydown', this.onKeyDown)
  //   }
  // }

  componentWillUnmount () {
    document.removeEventListener('click', this.onClickOutside)
    // document.removeEventListener('keydown', this.onKeyDown)
  }

  parse = (values?: any | any[]) => {
    values = commonUtils.ensureArray(values)

    return this.options.reduce((s, option) => {
      const {label, value} = option.props

      if (!!values.find((v: any) => v === value)) {
        s.push({label, value})
      }

      return s
    }, [] as ISelectOption[])
  }

  addOption = (option: SelectOption) => {
    this.options.push(option)
  }

  removeOption = (option: SelectGroup) => {
    this.options.filter((o) => o !== option)
  }

  select = (label: string, value: any) => {
    const {multiple} = this.props
    const {selected: oldSelected} = this.state

    const exist = oldSelected.find((o) => o.value === value)

    const selected = multiple
      ? exist
        ? oldSelected.filter((o) => o.value !== value)
        : oldSelected.concat({label, value})
      : [{label, value}]

    this.setState({selected})

    const onChange = Base.action(this.props.onChange)
    onChange(selected)
  }

  isMatched = (label: string) => {
    const searchKey = this.state.searchKey.trim()

    return searchKey ? label.indexOf(searchKey) > -1 : true
  }

  isSelected = (value: any) => {
    return !!this.state.selected.find((o) => o.value === value)
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

  // onKeyDown = (e: KeyboardEvent) => {
  //   console.log(e)
  // }

  onVisibleToggle = () => {
    this.setState({visible: !this.state.visible})
  }

  onSearchKeyChange = (e: any, searchKey: string) => {
    this.setState({searchKey})
  }

  onSearchKeyClear = () => {
    this.setState({searchKey: ''})
  }

  renderValue = (selected: ISelectOption[], multiple?: boolean) => {
    return (
      multiple
        ? (
          <div className='bui-select__tags'>
            {
              selected.map((o, i) => (
                <Tag
                  key={i}
                  closable
                  onClose={() => this.select(o.label, o.value)}
                >
                  {o.label}
                </Tag>
              ))
            }
          </div>
        )
        : selected[0].label
    )
  }

  render () {
    const {size = 'normal', placeholder, searchable, multiple, full, children} = this.props
    const {visible, selected, searchKey} = this.state

    const className = this.className(
      'bui-select',
      `bui-select--${size}`,
      {
        'bui-select--full': full,
        'bui-select--visible': visible
      }
    )

    return (
      <div
       className={className}
       style={this.style()}
       ref={this.saveRoot}
      >
        <div className='bui-select__header' onClick={this.onVisibleToggle}>
          {selected.length ? (
            this.renderValue(selected, multiple)
          ) : (
            <div className='bui-select__placeholder'>{placeholder}</div>
          )}
        </div>
        <div className='bui-select__container'>
          {searchable && (
            <div className='bui-select__search'>
              <Input
                full
                autoFocus
                size='small'
                suffix={searchKey ? (
                  <Icon fit name='times' onClick={this.onSearchKeyClear}/>
                ) : 'search'}
                value={searchKey}
                onChange={this.onSearchKeyChange}/>
            </div>
          )}
          <ScrollBar className='bui-select__options'>
            {children}
          </ScrollBar>
        </div>
      </div>
    )
  }
}
