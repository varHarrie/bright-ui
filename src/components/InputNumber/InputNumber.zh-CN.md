---
category: 表单
columns: double
title: InputNumber
subtitle: 数字输入框
---

## 基本用法

一个基本的数字输入框

```js
import React from 'react'
import {InputNumber} from 'bright-ui'

export default class InputNumberNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      value: 5
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e, value) {
    console.log(value)
    this.setState({value})
  }

  render () {
    const {value} = this.state

    return (
      <div>
        <InputNumber min={-10} max={10} value={value} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## 步长

根据步长进行增减

```js
import React from 'react'
import {InputNumber} from 'bright-ui'

export default class InputNumberStep extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (e, value) {
    console.log(value)
    this.setState({value})
  }

  render () {
    const {value} = this.state

    return (
      <div>
        <InputNumber step={0.5} value={value} onChange={this.onChange}/>
      </div>
    )
  }
}

```

## InputNumber API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \|'large' | 'normal' |
| value | 输入框的值 | number | - |
| min | 最小值 | number | - |
| max | 最大值 | number | - |
| step | 步长 | number | - |
| precision | 精度 | number | - |
| placeholder | 提示 | string | - |
| showHandlers | 显示调节按钮 | boolean | true |
| readOnly | 只读，只能通过按钮调节 | boolean | false |
| disabled | 禁用 | boolean | false |
| full | 撑满父容器宽度 | boolean | false |
| radius | 圆角 | 'number' \|'square' \| 'circle' | - |
| autoFocus | 自动获取焦点 | boolean | false |
| prefix | 前缀元素 | Icon \| string | - |
| formatter | 指定输入框值的展示格式 | (value: number \| string) => string | - |
| parser | 指定解析输入框值从字符串转化为数字的方式，配合`formatter`使用 | (value: string) => number | - |
| onChange | 输入框值改变时触发的事件 | (e: ChangeEvent, value: string) => void | - |
| onFocus | 输入框获取焦点时触发的事件 | (e: FormEvent) => void | - |
| onBlur | 输入框失去焦点时触发的事件 | (e: FormEvent) => void | - |
| onKeyDown | 在输入框按下键盘时触发的事件 | (e: FormEvent) => void | - |
