---
category: 容器
columns: single
title: ScrollBar
subtitle: 滚动框
---

## 基本用法

超出范围时显示滚动条

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {ScrollBar} from 'bright-ui'

export default class ScrollBarNormal extends React.Component {
  render () {
    return (
      <div style={{height: '200px'}}>
        <ScrollBar>
          <div style={{padding: '10px'}}>
            <Paragraphs total={30}/>
          </div>
        </ScrollBar>
      </div>
    )
  }
}

```

## ScrollBar API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| direction | 滚动方向 | 'vertical' \| 'horizontal' | 'vertical' |
| stopPropagation | 是否阻止滚动事件向父元素冒泡 | boolean | false |
| dragToScroll | 是否支持拖拽滚动 | boolean | false |
