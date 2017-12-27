---
category: 数据显示
columns: double
title: Calendar
subtitle: 日历
---

## 基本用法

用于日期展示和选择

```js
import * as React from 'react'
import {Calendar, Input} from 'bright-ui'

function format (date, placeholder = '请选择日期') {
  if (date instanceof Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
  } else {
    return placeholder
  }
}

export default class CalendarNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (value) {
    this.setState({value})
  }

  render () {
    const {value} = this.state

    return (
      <div>
        <Input className='mb10' full value={format(value)}/>
        <Calendar value={value} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## 范围选择

选择日期区间

```js
import * as React from 'react'
import {Calendar, Input} from 'bright-ui'

function format (date, placeholder = '请选择日期') {
  if (date instanceof Date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
  } else {
    return placeholder
  }
}

export default class CalendarRange extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      value: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (start, end) {
    this.setState({value: [start, end]})
  }

  render () {
    const {value} = this.state
    const text = value ? format(value[0]) + ' ~ ' + format(value[1]) : '请选择日期'

    return (
      <div>
        <Input className='mb10' full value={text}/>
        <Calendar type='range' value={value} onChange={this.onChange}/>
      </div>
    )
  }
}
```

## Calendar API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 选中日期 | Date \| [Date, Date] \| null | null |
| type | 类型 | 'date' \| 'range' | 'date' |
| firstDayOfWeek | 设置一周的第一天是周几 | number | 1 |
| onChange | 选中日期时触发的事件 | (start: Date, end?: Date) => void | - |
