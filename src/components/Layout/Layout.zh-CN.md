---
category: 容器
columns: single
title: Layout
subtitle: 布局
---

## 基本用法

一个简单的上下分栏布局

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import Browser from '../../commons/Browser'
import {Layout} from 'bright-ui'

export default class LayoutNormal extends React.Component {
  render () {
    const headerStyle = {background: '#555', color: 'white', padding: '15px'}
    const containerStyle = {padding: '15px'}
    const footerStyle = {background: '#eee', color: '#999', padding: '15px'}

    return (
      <div>
        <Browser>
          <Layout
            full
            header={(
              <div style={headerStyle}>
                header
              </div>
            )}
            footer={(
              <div style={footerStyle}>
                footer
              </div>
            )}
          >
            <div style={containerStyle}>
              <Paragraphs total={8}/>
            </div>
          </Layout>
        </Browser>
      </div>
    )
  }
}
```

## 水平布局

左右分栏布局，可用于实现侧边菜单

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import Browser from '../../commons/Browser'
import {Layout} from 'bright-ui'

export default class LayoutHorizontal extends React.Component {
  render () {
    const headerStyle = {background: '#555', color: 'white', padding: '15px', height: '100%'}
    const containerStyle = {padding: '15px'}

    return (
      <div>
        <Browser>
          <Layout
            full
            direction='horizontal'
            header={(
              <div style={headerStyle}>
                header
              </div>
            )}
          >
            <div style={containerStyle}>
              <h2>xxxxxx</h2>
              <Paragraphs total={8}/>
            </div>
          </Layout>
        </Browser>
      </div>
    )
  }
}

```

## Layout API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| direction | 布局方向 | 'horizontal' \| 'vertical' \| 'horizontal-reverse' \| 'vertical-reverse' | 'vertical' |
| centered | 是否居中，即添加`align-items: center`样式 | boolean | false |
| full | 撑满容器 | boolean | false |
| gutter | `header`，`container`，`footer`之间的间距 | number | - |
| header | 头部 | React.ReactNode | - |
| footer | 尾部 | React.ReactNode | - |
