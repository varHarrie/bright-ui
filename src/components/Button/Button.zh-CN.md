---
category: 表单
columns: double
title: Button
subtitle: 按钮
---

## 颜色类型

提供多种颜色类型，用于不同的场合和语境

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonType extends React.Component {
  render () {
    return (
      <div>
        <div className='mb10'>
          <Button>default</Button>
          <Button type='plain'>plain</Button>
          <Button type='white'>white</Button>
          <Button type='black'>black</Button>
        </div>
        <div>
          <Button type='primary'>primary</Button>
          <Button type='success'>success</Button>
          <Button type='warning'>warning</Button>
          <Button type='danger'>danger</Button>
        </div>
      </div>
    )
  }
}
```

## 尺寸

设置按钮尺寸

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonSize extends React.Component {
  render () {
    return (
      <div>
        <Button size='small'>small</Button>
        <Button>normal</Button>
        <Button size='large'>large</Button>
      </div>
    )
  }
}
```

## 简约样式

边框形式展示

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonBasic extends React.Component {
  render () {
    return (
      <div>
        <div className='mb10'>
          <Button basic>default</Button>
          <Button basic type='plain'>plain</Button>
          <Button basic type='white'>white</Button>
          <Button basic type='black'>black</Button>
        </div>
        <div>
          <Button basic type='primary'>primary</Button>
          <Button basic type='success'>success</Button>
          <Button basic type='warning'>warning</Button>
          <Button basic type='danger'>danger</Button>
        </div>
      </div>
    )
  }
}
```

## 圆角

设置按钮圆角

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonRadius extends React.Component {
  render () {
    return (
      <div>
        <Button radius={10}>10px</Button>
        <Button radius='square'>square</Button>
        <Button radius='circle'>circle</Button>
        <Button radius='circle' icon='plus' type='primary'/>
        <Button radius='circle' icon='check' type='success'/>
        <Button radius='circle' icon='info' type='warning' basic/>
        <Button radius='circle' icon='close' type='danger' basic/>
      </div>
    )
  }
}
```

## 图标

内嵌图标

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonIcon extends React.Component {
  render () {
    return (
      <div>
        <Button icon='search'/>
        <Button icon='plus' type='primary'>icon</Button>
        <Button icon='check' type='success'>icon</Button>
        <Button icon='info' type='warning'>icon</Button>
        <Button icon='close' type='danger'>icon</Button>
      </div>
    )
  }
}
```

## 禁用

禁止点击

```js
import React from 'react'
import {Button} from 'bright-ui'

export default  class ButtonDisabled extends React.Component {
  render () {
    return (
      <div>
        <Button disabled>disabled</Button>
        <Button disabled type='primary'>disabled</Button>
        <Button disabled basic type='primary'>disabled</Button>
      </div>
    )
  }
}
```

## 加载中

显示加载中动画

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonLoading extends React.Component {
  render () {
    return (
      <div>
        <Button loading>loading</Button>
        <Button loading type='primary'>loading</Button>
        <Button loading basic type='primary'>loading</Button>
      </div>
    )
  }
}
```

## 按钮组

将一系列按钮组合在一起，移除相互之间的间隙

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonGroupNormal extends React.Component {
  render () {
    return (
      <div>
        <div className='mb10'>
          <Button.Group>
            <Button basic>上一首</Button>
            <Button basic>播放</Button>
            <Button basic>下一首</Button>
          </Button.Group>
          <Button.Group>
            <Button basic icon='home'/>
            <Button basic icon='bell-o'/>
            <Button basic icon='cog'/>
          </Button.Group>
        </div>
        <div>
          <Button.Group full>
            <Button basic type='primary'>left</Button>
            <Button basic type='success' disabled>disabled</Button>
            <Button basic type='danger'>right</Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}
```

## 垂直方向按钮组

```js
import React from 'react'
import {Button} from 'bright-ui'

export default class ButtonGroupVertical extends React.Component {
  render () {
    return (
      <div>
        <Button.Group direction='vertical'>
          <Button basic>上一首</Button>
          <Button basic>播放</Button>
          <Button basic>下一首</Button>
        </Button.Group>
        <Button.Group direction='vertical'>
          <Button basic icon='home'/>
          <Button basic icon='bell-o'/>
          <Button basic icon='cog'/>
        </Button.Group>
      </div>
    )
  }
}
```

## Button API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \|'large' | 'normal' |
| type| 颜色类型 | 'default' \| 'plain' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'white' \| 'black' | 'default' |
| nativeType | 原生按钮`type`，作用于表单 | 'button' \| 'submit' \| 'reset' | 'button' |
| basic | 简约类型 | boolean | false |
| icon | 图标名称 | string | - |
| disabled | 禁用 | boolean | false |
| loading | 加载中 | boolean | false |
| full | 撑满父容器宽度 | boolean | false |
| radius | 圆角 | 'number' \|'square' \| 'circle' | - |
| onClick | 点击时触发的事件 | (e: MouseEvent) => Promise \| void | - |

## Button.Group API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| direction | 排列方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| full | 是否撑满父元素宽度或高度 | boolean | false |
