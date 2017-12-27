---
category: 表单
columns: double
title: Checkbox
subtitle: 多选框
---

## 基本用法

用于选中多个值

```js
import * as React from 'react'
import {Checkbox} from 'bright-ui'

export default class CheckboxNormal extends React.Component {
  render () {
    return (
      <div>
        <Checkbox>Apple</Checkbox>
        <Checkbox>Banana</Checkbox>
        <Checkbox>Coconut</Checkbox>
      </div>
    )
  }
}
```

## 尺寸

设置多选框大小

```js
import * as React from 'react'
import {Checkbox} from 'bright-ui'

export default class CheckboxSize extends React.Component {
  render () {
    return (
      <div>
        <Checkbox size='small'>small</Checkbox>
        <Checkbox>normal</Checkbox>
        <Checkbox size='large'>large</Checkbox>
      </div>
    )
  }
}
```

## 不确定状态

使用`indeterminate`属性实现不确定状态

```js
import * as React from 'react'
import {Checkbox} from 'bright-ui'

export default class CheckboxIndeterminate extends React.Component {

  constructor (props) {
    super(props)

    this.options = ['Apple', 'Banana', 'Coconut']

    this.state = {
      selectedOptions: []
    }

    this.isSelected = this.isSelected.bind(this)
    this.isSelectedAll = this.isSelectedAll.bind(this)
    this.isIndeterminate = this.isIndeterminate.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onToggle = this.onToggle.bind(this)
  }

  isSelected (name) {
    return this.state.selectedOptions.find((o: string) => o === name)
  }

  isSelectedAll () {
    return this.state.selectedOptions.length === this.options.length
  }

  isIndeterminate () {
    return this.state.selectedOptions.length > 0
      && this.state.selectedOptions.length < this.options.length
  }

  onChange (e, checked, value) {
    const selectedOptions: string[] = this.state.selectedOptions

    if (checked) {
      this.setState({selectedOptions: [...selectedOptions, value]})
    } else {
      this.setState({selectedOptions: selectedOptions.filter((o) => o !== value)})
    }
  }

  onToggle (e, checked) {
    if (checked) {
      this.setState({selectedOptions: this.options})
    } else {
      this.setState({selectedOptions: []})
    }
  }

  render () {
    return (
      <div>
        <div>
          <Checkbox
            indeterminate={this.isIndeterminate()}
            checked={this.isSelectedAll()}
            onChange={this.onToggle}>All</Checkbox>
        </div>
        <div>
          {this.options.map((option) => (
            <Checkbox
              key={option}
              value={option}
              checked={this.isSelected(option)}
              onChange={this.onChange}>{option}</Checkbox>
          ))}
        </div>
      </div>
    )
  }
}
```

## 禁用

禁止选择

```js
import * as React from 'react'
import {Checkbox} from 'bright-ui'

export default class CheckboxDisabled extends React.Component {
  render () {
    return (
      <div>
        <Checkbox disabled>disabled</Checkbox>
        <Checkbox indeterminate disabled>disabled</Checkbox>
        <Checkbox checked disabled>disabled</Checkbox>
      </div>
    )
  }
}
```

## Checkbox API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| checked | 是否选中 | boolean | false |
| indeterminate | 不确定状态，仅用于控制样式 | boolean | false |
| value | 多选框的值 | any | - |
| disabled | 是否禁用 | boolean | false |
| size | 尺寸 | 'small' \| 'normal' \| 'large' | 'normal' |
| onChange | 选中值改变时触发的事件 | (e: ChangeEvent, checked: boolean, value: any) => void | - |
