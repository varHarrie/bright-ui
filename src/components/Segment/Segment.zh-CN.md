---
category: 容器
columns: double
title: Segment
subtitle: 分段
---

## 基本用法

一个带阴影的容器

```js
import React from 'react'
import {Segment} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class SegmentNormal extends React.Component {
  render () {
    return (
      <div className='pd30' style={{background: '#eee'}}>
        <Segment><Paragraphs/></Segment>
      </div>
    )
  }
}
```

## 升起

鼠标悬停时升起

```js
import React from 'react'
import {Segment} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class SegmentBordered extends React.Component {
  render () {
    return (
      <div className='pd30'>
        <Segment bordered className='mb10'><Paragraphs/></Segment>
        <Segment bordered raised><Paragraphs/></Segment>
      </div>
    )
  }
}
```

## 边框

显示边框，用于白色背景

```js
import React from 'react'
import {Segment} from 'bright-ui'
import Paragraphs from '../../commons/Paragraphs'

export default class SegmentRaised extends React.Component {
  render () {
    return (
      <div className='pd30' style={{background: '#eee'}}>
        <Segment raised><Paragraphs/></Segment>
      </div>
    )
  }
}
```

## Segment API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| bordered | 显示边框 | boolean | false |
| full | 撑满父容器 | boolean | false |
| raised | 鼠标悬停时升起 | boolean | false |
