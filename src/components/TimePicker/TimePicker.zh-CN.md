---
category: 表单
columns: double
title: TimePicker
subtitle: 时间选择器
---

## 基本用法

用于选择时分秒

```js
import React from 'react'
import {TimePicker} from 'bright-ui'

export default class TimePickerNormal extends React.Component {
  render () {
    return (
      <div>
        <TimePicker/>
      </div>
    )
  }
}
```

## 格式

设置显示格式

```js
import React from 'react'
import {TimePicker} from 'bright-ui'

export default class TimePickerFormat extends React.Component {
  render () {
    return (
      <div>
        <TimePicker format='HH时mm分'/>
      </div>
    )
  }
}
```

## TimePicker API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| icon | 图标 | string | 'clock-o'
| value | 值 | Date \| string \| {hours?: number, minutes?: number, seconds?: number} | -
| format | 格式 | string | 'HH:mm:ss'
| placeholder | 提示 | string | -
| disabled | 是否禁用 | boolean | false
| full | 撑满父容器宽度 | boolean | false
| size | 输入框尺寸 | 'small' \| 'normal' \| 'large' | -
| onChange | 值改变时触发的事件 | (value: string, hours: number, minutes: number, seconds: number) => void | -
| onFocus | 输入框获取焦点时触发的事件 | (e: FormEvent) => void | -
| onBlur | 输入框失去焦点时触发的事件 | (e: FormEvent) => void | -
| onKeyDown | 输入框获取按下键盘时触发的事件 | (e: FormEvent) => void | -
