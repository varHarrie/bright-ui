---
category: 数据展示
columns: double
title: List
subtitle: 列表
---

## 基本用法

用于展示并列的数据

```js
import React from 'react'
import {List} from 'bright-ui'

export default class ListNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      values: []
    }

    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (e, value) {
    const values: any[] = this.state.values

    if (this.isSelected(value)) {
      this.setState({values: values.filter((v) => v !== value)})
    } else {
      this.setState({values: [...values, value]})
    }
  }

  isSelected (value) {
    return !!this.state.values.find((v: any) => v === value)
  }

  render () {
    return (
      <div>
        <List title='Fruits'>
          {['Apple', 'Banana', 'Pear', 'Orange'].map((value) => (
            <List.Item
              key={value}
              value={value}
              selected={this.isSelected(value)}
              onClick={this.onToggle}
            >{value}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}

```

## List API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| title | 标题 | React.ReactNode |- |
| size | 尺寸 | 'small' \| 'normal' \|'large' | 'normal' |

## List.Item API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 值，用于传递到`onClick` | any | - |
| selected | 是否选中的 | boolean | false |
| header | 头部 | React.ReactNode | - |
| actions | 尾部 | React.ReactNode | - |
| onClick | 点击时触发的事件 | (e: MouseEvent, value: any) => void | - |
