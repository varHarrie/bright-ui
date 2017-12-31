---
category: 容器
columns: single
title: Grid
subtitle: 栅格
---

## 基本用法

使用`Row`和`Col`定义区块大小

```js
import React from 'react'
import {Row, Col} from 'bright-ui'

export default class GridNormal extends React.Component {
  render () {
    return (
      <div>
        <Row gutter={10}>
          <Col span={2}><div className='mb10 g'/></Col>
          <Col span={6}><div className='mb10 g'/></Col>
          <Col span={2}><div className='mb10 g'/></Col>
          <Col span={6}><div className='mb10 g'/></Col>
          <Col span={2}><div className='mb10 g'/></Col>
          <Col span={6}><div className='mb10 g'/></Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={2}><div className='mb10 g'/></Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}><div className='mb10 g'/></Col>
          <Col span={12}><div className='mb10 g'/></Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}><div className='mb10 g'/></Col>
        </Row>
      </div>
    )
  }
}
```

## Row API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| gutter | 栅格间距 | number | 0 |

## Col API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| span | 占位格数 | number | 1 |
| xs | <768px时占位格数 | number | - |
| sm | >=768px时占位格数 | number | - |
| md | >=992px时占位格数 | number | - |
| lg | >=1200px时占位格数 | number | - |
| xl | >=1600px时占位格数 | number | - |
