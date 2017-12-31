---
category: 数据展示
columns: double
title: Tag
subtitle: 标签
---

## 基本用法

一组不同颜色的标签

```js
import React from 'react'
import {Tag} from 'bright-ui'

export default class TagNormal extends React.Component {
  render () {
    return (
      <div>
        <Tag>gray</Tag>
        <Tag color='primary'>primary</Tag>
        <Tag color='success'>success</Tag>
        <Tag color='warning'>warning</Tag>
        <Tag color='danger'>danger</Tag>
        <Tag color='#345432'>#345432</Tag>
      </div>
    )
  }
}
```

## 圆角

设置圆角大小

```js
import React from 'react'
import {Tag} from 'bright-ui'

export default class TagRadius extends React.Component {
  render () {
    return (
      <div>
        <Tag radius='circle'>gray</Tag>
        <Tag radius='circle' color='primary'>primary</Tag>
        <Tag radius='circle' color='success'>success</Tag>
        <Tag radius='square' color='warning'>warning</Tag>
        <Tag radius='square' color='danger'>danger</Tag>
        <Tag radius='square' color='#345432'>#345432</Tag>
      </div>
    )
  }
}
```

## 可关闭的

显示关闭按钮

```js
import React from 'react'
import {Tag} from 'bright-ui'

export default class TagClosable extends React.Component {
  render () {
    return (
      <div>
        <Tag closable>gray</Tag>
        <Tag closable color='primary'>primary</Tag>
        <Tag closable color='success'>success</Tag>
        <Tag closable color='warning'>warning</Tag>
        <Tag closable color='danger'>danger</Tag>
        <Tag closable color='#345432'>#345432</Tag>
      </div>
    )
  }
}
```

## Tag API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \| 'large' | 'normal' |
| closable | 是否显示关闭按钮 | boolean | false |
| clickable | 是否显示可点击样式 | boolean | false |
| radius | 圆角大小 | 'number' \|'square' \| 'circle' | - |
| color | 颜色 | 'gray' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| string | 'gray' |
| onClick | 点击标签时触发的事件 | (e: MouseEvent) => void | - |
| onClose | 点击关闭按钮时触发的事件 | (e: MouseEvent) => void | - |
