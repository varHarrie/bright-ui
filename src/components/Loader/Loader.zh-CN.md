---
category: 容器
columns: double
title: Loader
subtitle: 加载器
---

## 基本用法

用于提示加载中的区域

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Loader, Button} from 'bright-ui'

export default class LoaderNormal extends React.Component {
  render () {
    const containerStyle = {height: '200px'}

    return (
      <div style={containerStyle}>
        <Loader full loading text='拼命加载中'/>
      </div>
    )
  }
}
```

## 覆盖

加载器覆盖在内容之上

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Loader, Button} from 'bright-ui'

export default class LoaderOverlay extends React.Component {
  render () {
    return (
      <div>
        <Loader loading>
          <Paragraphs className='mb10' total={6}/>
          <Button>Can not click</Button>
        </Loader>
      </div>
    )
  }
}
```

## Loader API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| loading | 是否加载中 | boolean | false |
| full | 撑满父容器高度 | boolean | false |
| text | 提示文本 | string | - |
