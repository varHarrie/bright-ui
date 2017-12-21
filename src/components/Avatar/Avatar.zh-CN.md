---
category: 数据显示
columns: double
title: Avatar
subtitle: 头像
---

## 尺寸

设置组件大小

```js
import React from 'react'
import {Avatar} from 'bright-ui'

export default class AvatarSize extends React.Component {
  render () {
    <div>
      <div className='ib mr10'>
        <Avatar size='small'/>
      </div>
      <div className='ib mr10'>
        <Avatar/>
      </div>
      <div className='ib mr10'>
        <Avatar size='large'/>
      </div>
    </div>
  }
}
```

## 标题

鼠标悬停在组件上面时显示文本

```js
import React from 'react'
import {Avatar} from 'bright-ui'

export class AvatarRadius extends React.Component {
  render () {
    return (
      <div>
        <div>
          <Avatar src={img} title='title'/>
        </div>
      </div>
    )
  }
}
```

## 圆角

设置圆角大小

```js
import React from 'react'
import {Avatar} from 'bright-ui'

export class AvatarRadius extends React.Component {
  render () {
    return (
      <div>
        <div className='ib mr10'>
          <Avatar src={img}/>
        </div>
        <div className='ib mr10'>
          <Avatar src={img} radius={10}/>
        </div>
        <div className='ib mr10'>
          <Avatar src={img} radius='square'/>
        </div>
        <div className='ib mr10'>
          <Avatar src={img} radius='circle'/>
        </div>
      </div>
    )
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| radius | 圆角大小 | {{radius}} | - |
| size | 尺寸 | {{size}} | 'normal' |
| src | 资源地址 | string | - |
| title | 鼠标悬停时显示的文本 | string | - |
