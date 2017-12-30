---
category: 表单
columns: double
title: Input
subtitle: 输入框
---

## 基本用法

一个基本的输入框

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e: any, value: string) {
    this.setState({value})
  }

  render () {
    const {value} = this.state

    return (
      <div>
        <Input value={value} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## 尺寸

不同尺寸的输入框

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputSize extends React.Component {
  render () {
    return (
      <div>
        <Input size='small' placeholder='small'/>
        <br/>
        <br/>
        <Input placeholder='normal'/>
        <br/>
        <br/>
        <Input size='large' placeholder='large'/>
      </div>
    )
  }
}
```

## 前缀元素和后缀元素

常用于显示图标

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputPrefixAndSuffix extends React.Component {
  render () {
    return (
      <div>
        <Input prefix='tags' suffix='search'/>
      </div>
    )
  }
}
```

## 禁用

禁用输入框

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputDisabled extends React.Component {
  render () {
    return (
      <div>
        <Input value='disabled' disabled/>
      </div>
    )
  }
}
```

## 撑满父容器宽度

设置100%的宽度

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputFull extends React.Component {
  render () {
    return (
      <div>
        <Input full/>
      </div>
    )
  }
}
```

## 圆角

设置输入框圆角

```js
import * as React from 'react'
import {Input} from 'bright-ui'

export default class InputRadius extends React.Component {
  render () {
    return (
      <div>
        <Input placeholder='default'/>
        <br/>
        <br/>
        <Input placeholder='square' radius='square'/>
        <br/>
        <br/>
        <Input placeholder='circle' radius='circle' suffix='search'/>
        <br/>
        <br/>
        <Input placeholder='10px' radius={10}/>
      </div>
    )
  }
}
```

## 输入框组合

支持`Input`，`InputNumber`，`Button`

```js
import * as React from 'react'
import {Input, Button, InputNumber} from 'bright-ui'

export default class InputGroupNormal extends React.Component {
  render () {
    return (
      <div>
        <Input.Group full className='mb10'>
          <Input placeholder='Area Code'/>
          <Input placeholder='Phone Number' style={{flex: 2}}/>
          <Button>Confirm</Button>
        </Input.Group>
        <Input.Group full className='mb10' header='Age'>
          <InputNumber placeholder='min'/>
          <Input placeholder='~' disabled style={{textAlign: 'center', flex: 'none', width: '30px'}}/>
          <InputNumber placeholder='max'/>
        </Input.Group>
        <Input.Group full className='mb10' header='http://' footer='.com'>
          <Input/>
        </Input.Group>
      </div>
    )
  }
}
```

## Input API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \|'large' | "normal" |
| type | 类型 | "text" \| "password" | "text" |
| value | 输入框的值 | string | - |
| placeholder | 提示 | string | - |
| readOnly | 只读 | boolean | false |
| disabled | 禁用 | boolean | false |
| full | 撑满父容器宽度 | boolean | false |
| radius | 圆角 | 'number' \|'square' \| 'circle' | - |
| autoFocus | 自动获取焦点 | boolean | false |
| prefix | 前缀元素 | Icon \| string | - |
| suffix | 后缀元素 | Icon \| string | - |
| onChange | 输入框值改变时触发的事件 | (e: ChangeEvent, value: string) => void | - |
| onFocus | 输入框获取焦点时触发的事件 | (e: FormEvent) => void | - |
| onBlur | 输入框失去焦点时触发的事件 | (e: FormEvent) => void | - |
| onKeyDown | 在输入框按下键盘时触发的事件 | (e: FormEvent) => void | - |

## Input.Group API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| full | 是否撑满父容器宽度 | boolean | false |
| header | 头部文本 | React.ReactNode | - |
| footer | 尾部文本 | React.ReactNode | - |
