---
category: 数据显示
columns: double
title: Badge
subtitle: 徽标数
---

## 内容

徽标内容

```js
import React from 'react'
import {Badge} from 'bright-ui'

export default class BadgeValue extends React.Component {
  render () {
    return (
      <div>
        <div className='ib mr30'>
          <Badge value={5}>
            <div className='s38'/>
          </Badge>
        </div>
        <div className='ib mr30'>
          <Badge value={200}>
            <div className='s38'/>
          </Badge>
        </div>
        <div className='ib mr30'>
          <Badge value='new'>
            <div className='s38'/>
          </Badge>
        </div>
      </div>
    )
  }
}
```

## 小红点

没有没有内容

```js
import React from 'react'
import {Badge} from 'bright-ui'

export default class BadgeDoc extends React.Component {
  render () {
    return (
      <div>
        <div className='ib mr30'>
          <Badge dot>
            <div className='s38'/>
          </Badge>
        </div>
      </div>
    )
  }
}
```

## 颜色样式

支持多种颜色

```js
import React from 'react'
import {Badge} from 'bright-ui'

export default class BadgeType extends React.Component {
  render () {
    return (
      <div>
        <div>
          <div className='ib mr30'>
            <Badge value='1' type='primary'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='success'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='warning'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='danger'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='gray'>
              <div className='s38'/>
            </Badge>
          </div>
        </div>
        <div>
          <div className='ib mr30'>
            <Badge dot type='primary'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge dot type='success'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge dot type='warning'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge dot type='danger'>
              <div className='s38'/>
            </Badge>
          </div>
          <div className='ib mr30'>
            <Badge dot type='gray'>
              <div className='s38'/>
            </Badge>
          </div>
        </div>
      </div>
    )
  }
}
```

## 独立使用

不包裹任何元素

```js
import React from 'react'
import {Badge} from 'bright-ui'

export default class BadgeNoChildren extends React.Component {
  render () {
    return (
      <div>
        <div className='mb30'>
          <div className='ib mr30'>
            <Badge value='1' type='primary'/>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='success'/>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='warning'/>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='danger'/>
          </div>
          <div className='ib mr30'>
            <Badge value='1' type='gray'/>
          </div>
        </div>
        <div>
          <div className='ib mr30'>
            <Badge dot type='primary'/>
          </div>
          <div className='ib mr30'>
            <Badge dot type='success'/>
          </div>
          <div className='ib mr30'>
            <Badge dot type='warning'/>
          </div>
          <div className='ib mr30'>
            <Badge dot type='danger'/>
          </div>
          <div className='ib mr30'>
            <Badge dot type='gray'/>
          </div>
        </div>
      </div>
    )
  }
}
```

## Badge API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 内容 | number \| string | - |
| max | 最大数值 | number | - |
| type | 颜色样式 | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'gray' | 'danger' |
| dot | 显示小红点 | boolean | false |
| offset | 位置偏移 | {top?: string, right?: string} | - |
