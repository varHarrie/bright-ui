---
category: 数据展示
columns: single
title: Pagination
subtitle: 分页
---

## 基本用法

一个分页条

```js
import React from 'react'
import {Pagination} from 'bright-ui'

export default class PaginationNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      page: 1
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (page) {
    this.setState({page})
  }

  render () {
    return (
      <div>
        <Pagination current={this.state.page} total={20} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## 布局

改变分页条布局

```js
import React from 'react'
import {Pagination} from 'bright-ui'

export default class PaginationLayout extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      page: 1
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (page: number) {
    this.setState({page})
  }

  render () {
    const layout1 = ['prev', 'next', 'pager', 'goto']
    const layout2 = ['prev', 'goto', 'next']

    return (
      <div>
        <Pagination layout={layout1} current={this.state.page} total={20} onChange={this.onChange}/>
        <br/><br/>
        <Pagination layout={layout2} current={this.state.page} total={20} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## Pagination API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| current | 当前页，从1开始 | number | 1 |
| total | 总页数 | number | - |
| range | 页码范围 | number | 2 |
| layout | 布局，支持`pager`，`prev`，`next`，`goto` | string[] | ['prev', 'pager', 'next'] |
| onChange | 当页码改变时触发的事件 | (page: number) => void | - |
