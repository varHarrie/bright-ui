import './Select.less'

import * as cn from 'classnames'
import * as React from 'react'

import Base, {SizeType} from '../../common/Base'
import BasePopover from '../../common/BasePopover'
import Icon from '../Icon'
import Input from '../Input'
import SelectOption, {ISelectOption} from './SelectOption'

const MODIFIER = {flip: {enabled: false}}

export interface ISelectProps {
  size?: SizeType
  multiple?: boolean
  searchable?: boolean
  addible?: boolean
  value?: any
  placeholder?: string
  children: React.ReactElement<SelectOption>[]
  onChange?: (value: any) => void
}

export interface ISelectState {
  options: ISelectOption[]
  selectedOption: ISelectOption | undefined
  visible: boolean
  searchKey: string
}

export default class Select extends Base<ISelectProps, ISelectState> {

  static Option = SelectOption

  $target: HTMLDivElement

  constructor (props: ISelectProps) {
    super(props)

    const options = props.children
      .filter((child) => child.type === SelectOption as any)
      .map((child: any) => ({label: child.props.label, value: child.props.value}))

    const selectedOption = options.find((o) => o.value === props.value)

    this.state = {
      options,
      selectedOption,
      visible: false,
      searchKey: ''
    }
  }

  componentDidUpdate (prevProps: ISelectProps, prevState: ISelectState) {
    if (prevState.visible && !this.state.visible) {
      document.removeEventListener('keydown', this.onKeyDown)
    } else if (!prevState.visible && this.state.visible) {
      document.addEventListener('keydown', this.onKeyDown)
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  saveTarget = (el: any) => this.$target = el

  isSelected = (option: ISelectOption) => {
    return this.state.selectedOption === option
  }

  isMatched = (option: ISelectOption) => {
    const searchKey = this.state.searchKey.trim()

    return searchKey ? option.label.indexOf(searchKey) > -1 : true
  }

  onSelect = (option: ISelectOption) => {
    this.setState({selectedOption: option})

    const onChange = Base.action(this.props.onChange)
    onChange(option.value)
  }

  onKeyDown = (e: KeyboardEvent) => {
    // console.log(e)
  }

  onVisibleChange = (visible: boolean) => {
    this.setState({visible})
  }

  onSearchKeyChange = (e: any, searchKey: string) => {
    this.setState({searchKey})
  }

  onSearchKeyClear = () => {
    this.setState({searchKey: ''})
  }

  render () {
    const {size = 'normal', placeholder, searchable} = this.props
    const {visible, options, selectedOption, searchKey} = this.state

    const className = this.className(
      'bui-select',
      `bui-select--${size}`,
      visible && 'bui-select--visible'
    )

    const popoverStyle = {width: this.$target && this.$target.offsetWidth}

    return (
      <BasePopover
        visible={visible}
        placement='bottom'
        onChange={this.onVisibleChange}
        refTarget={this.saveTarget}
        modifiers={MODIFIER}
        content={(
          <div className='bui-select__popover' style={popoverStyle}>
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
            <div className='bui-select__options'>
              {options.filter(this.isMatched).map((option, i) => (
                <Option
                  key={i}
                  option={option}
                  selected={this.isSelected(option)}
                  onSelect={this.onSelect}/>
              ))}
            </div>
          </div>
        )}
      >
        <div className={className}>
          {selectedOption ? selectedOption.label : (
            <div className='bui-select__placeholder'>{placeholder}</div>
          )}
        </div>
      </BasePopover>
    )
  }
}

interface IOptionProps {
  option: ISelectOption
  selected?: boolean
  hovered?: boolean
  onSelect: (option: ISelectOption) => void
}

function Option ({option, selected, hovered, onSelect}: IOptionProps) {
  const className = cn(
    'bui-select__option',
    {
      'bui-select__option--selected': selected,
      'bui-select__option--hovered': hovered
    }
  )

  return (
    <div className={className} onClick={() => onSelect(option)}>
      {option.label}
    </div>
  )
}
