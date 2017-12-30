---
category: 其他
columns: double
title: Divider
subtitle: 分割线
---

## 基本用法

用于隔开不同元素

```js
import * as React from 'react'
import {Divider, Icon} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class DividerNormal extends React.Component {
  render () {
    return (
      <div>
        <Paragraphs/>
        <Divider/>
        <Paragraphs/>
      </div>
    )
  }
}
```

## 垂直分割线

用于垂直展示

```js
import * as React from 'react'
import {Divider, Icon} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class DividerVertical extends React.Component {
  render () {
    return (
      <div style={{display: 'flex', height: '168px'}}>
        <Paragraphs total={8} style={{flex: '1'}}/>
        <Divider direction='vertical'/>
        <Paragraphs total={8} style={{flex: '1'}}/>
      </div>
    )
  }
}
```

## 内容

在分割线中间展示内容

```js
import * as React from 'react'
import {Divider, Icon} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class DividerContent extends React.Component {
  render () {
    return (
      <div>
        <div style={{display: 'flex', height: '168px'}}>
          <Paragraphs total={8} style={{flex: '1'}}/>
          <Divider direction='vertical'><Icon name='chain'/></Divider>
          <Paragraphs total={8} style={{flex: '1'}}/>
        </div>
        <Divider>或者</Divider>
        <Paragraphs/>
      </div>
    )
  }
}
```

## Divider API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| vertical | 展示方向 | "horizontal" \| "vertical" | "vertical" |
| children | 内容 | ReactNode | - |
