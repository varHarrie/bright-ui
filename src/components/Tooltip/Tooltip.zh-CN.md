---
category: 弹出层
columns: double
title: Tooltip
subtitle: 气泡提示
---

## 基本用法

设置气泡位置

```js
import React from 'react'
import {Tooltip, Button} from 'bright-ui'

export default class TooltipNormal extends React.Component {
  render () {
    return (
      <div className='TooltipNormal' style={{marginLeft: '30px'}}>
        <div className='mb10'>
          <Tooltip content='top-start' placement='top-start'><Button icon='circle-o'/></Tooltip>
          <Tooltip content='top' placement='top'><Button icon='circle-o'/></Tooltip>
          <Tooltip content='top-end' placement='top-end'><Button icon='circle-o'/></Tooltip>
        </div>

        <div className='mb10'>
          <Tooltip content='left-start' placement='left-start'><Button icon='circle-o'/></Tooltip>
          <Button icon='times'/>
          <Tooltip content='right-start' placement='right-start'><Button icon='circle-o'/></Tooltip>
        </div>

        <div className='mb10'>
          <Tooltip content='left' placement='left'><Button icon='circle-o'/></Tooltip>
          <Button icon='times'/>
          <Tooltip content='right' placement='right'><Button icon='circle-o'/></Tooltip>
        </div>

        <div className='mb10'>
          <Tooltip content='left-end' placement='left-end'><Button icon='circle-o'/></Tooltip>
          <Button icon='times'/>
          <Tooltip content='right-end' placement='right-end'><Button icon='circle-o'/></Tooltip>
        </div>

        <div>
          <Tooltip content='bottom-start' placement='bottom-start'><Button icon='circle-o'/></Tooltip>
          <Tooltip content='bottom' placement='bottom'><Button icon='circle-o'/></Tooltip>
          <Tooltip content='bottom-end' placement='bottom-end'><Button icon='circle-o'/></Tooltip>
        </div>
      </div>
    )
  }
}
```

## Tooltip API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| color | 颜色 | 'dark' \| 'light' | 'dark' |
| zIndex | 设置`z-index` | number | - |
| visible | 是否显示 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| showArrow | 是否显示箭头 | boolean | true |
| trigger | 触发方式 | 'click' \| 'hover' \| 'focus' | 'click' |
placement | 显示位置 | 'auto' \| 'top' \| 'top-start' \| 'top-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | 'top' |
| content | 内容 | ReactNode | - |
| onChange | 显示或隐藏时触发的事件 | (visible: boolean) => void | - |
