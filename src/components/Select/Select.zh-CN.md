---
category: 表单
columns: double
title: Select
subtitle: 选择器
---

## 基本用法

一个基本的选择器

```js
import React from 'react'
import {Select} from 'bright-ui'

const fruits = [
  'apple',
  'banana',
  'cherry',
  'durin'
]

export default class SelectNormal extends React.Component {
  render () {
    return (
      <div>
        <Select placeholder='fruit' value='banana'>
          {fruits.map((name) => (
            <Select.Option key={name} label={name} value={name}/>
          ))}
        </Select>
      </div>
    )
  }
}
```

## 可搜索

输入关键字进行筛选

```js
import React from 'react'
import {Select} from 'bright-ui'

const fruits = [
  'apple',
  'banana',
  'cherry',
  'durin'
]

export default class SelectSearchable extends React.Component {
  render () {
    return (
      <div>
        <Select placeholder='fruit' searchable>
          {fruits.map((name) => (
            <Select.Option key={name} label={name} value={name}/>
          ))}
        </Select>
      </div>
    )
  }
}
```

## 多选

可选择多个选项

```js
import React from 'react'
import {Select} from 'bright-ui'

const fruits = [
  'apple',
  'banana',
  'cherry',
  'durin'
]

export default class SelectMultiple extends React.Component {
  render () {
    return (
      <div>
        <Select placeholder='fruit' multiple searchable full>
          {fruits.map((name) => (
            <Select.Option key={name} label={name} value={name}/>
          ))}
        </Select>
      </div>
    )
  }
}
```

## 分组

对选项进行分组

```js
import React from 'react'
import {Select} from 'bright-ui'

const fruits = [
  'apple',
  'banana',
  'cherry',
  'durin'
]

export default class SelectGroup extends React.Component {
  render () {
    return (
      <div>
        <Select searchable>
          <Select.Option label='X' value='X'/>
          <Select.Option label='Y' value='Y'/>
          <Select.Option label='Z' value='Z'/>
          <Select.Group label='A'>
            <Select.Option label='a-1' value='a-1'/>
            <Select.Option label='a-2' value='a-2'/>
          </Select.Group>
          <Select.Group label='B'>
            <Select.Option label='b-1' value='b-1'/>
            <Select.Option label='b-2' value='b-2'/>
            <Select.Option label='b-3' value='b-3'/>
          </Select.Group>
          <Select.Group label='C'>
            <Select.Option label='c-1' value='c-1'/>
          </Select.Group>
        </Select>
      </div>
    )
  }
}
```

## Select API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \| 'large' |  'normal' |
| multiple | 是否多选 | boolean | false |
| searchable | 是否可搜索 | boolean | false |
| value | 选中值 | any \| any[] | - |
| placeholder | 提示 | string | - |
| full | 是否撑满父容器宽度 | boolean | false |
