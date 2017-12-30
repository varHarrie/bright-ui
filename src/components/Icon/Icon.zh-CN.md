---
category: 数据展示
columns: double
title: Icon
subtitle: 图标
---

## 基本用法

使用`name`指定图标名称，可使用的图标名称请查阅[fontawesome](http://fontawesome.io/icons/)，使用时请省略`fa-`前缀

```js
import * as React from 'react'
import {Icon} from 'bright-ui'

export default class IconNormal extends React.Component {
  render () {
    return (
      <div>
        <Icon className='mr10' name='user'/>
        <Icon className='mr10' name='pencil'/>
        <Icon className='mr10' name='cog'/>
        <Icon className='mr10' name='tag'/>
      </div>
    )
  }
}
```

## 颜色

支持多种颜色

```js
import * as React from 'react'
import {Icon} from 'bright-ui'

export default class IconColor extends React.Component {
  render () {
    return (
      <div>
        <Icon className='mr10' name='tag'/>
        <Icon className='mr10' name='tag' color='gray'/>
        <Icon className='mr10' name='tag' color='primary'/>
        <Icon className='mr10' name='tag' color='success'/>
        <Icon className='mr10' name='tag' color='warning'/>
        <Icon className='mr10' name='tag' color='danger'/>
      </div>
    )
  }
}
```

## Icon API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 图标名称 | string | - |
| spinning | 旋转的 | boolean | false |
| fit | 等宽的 | boolean | false |
| clickable | 显示可点击样式 | boolean | - |
| color | 颜色 | "normal" \| "gray" \| "primary" \| "success" \| "warning" \| "danger" \| string | "normal" |
| onClick | 点击图标时触发的事件 | (e: MouseEvent => void) | - |
