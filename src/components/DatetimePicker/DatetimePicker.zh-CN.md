---
category: 表单
columns: double
title: DatetimePicker
subtitle: 日期时间选择器
---

## 基本用法

用于选择日期和时间

```js
import React from 'react'
import {DatetimePicker, Button} from 'bright-ui'

export default class DatetimePickerNormal extends React.Component {
  render () {
    return (
      <div>
        <DatetimePicker/>
      </div>
    )
  }
}
```

## 格式

设置日期格式

```js
import React from 'react'
import {DatetimePicker, Button} from 'bright-ui'

export default class DatetimePickerFormat extends React.Component {
  render () {
    return (
      <div>
        <DatetimePicker format='YYYY年MM月DD日 HH时mm分'/>
      </div>
    )
  }
}
```

## 自定义触发元素

```js
import React from 'react'
import {DatetimePicker, Button} from 'bright-ui'

export default class DatetimePickerChildren extends React.Component {
  render () {
    return (
      <div>
        <DatetimePicker trigger='click'>
          {({value}) => (
            <Button>日期：{value}</Button>
          )}
        </DatetimePicker>
      </div>
    )
  }
}

```

## DatetimePicker API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| icon | 图标 | string | 'calendar' |
| value | 值 | Date \| string \| null | - |
| format | 格式 | string | 'YYYY-MM-DD HH:mm:ss' |
| placeholder | 提示 | string | - |
| disabled | 是否禁用 | boolean | false |
| full | 是否撑满父容器宽度 | boolean | false |
| size | 输入框尺寸 | 'small' \| 'normal' \| 'large' | - |
| trigger | 弹出层触发方式 | 'click' \| 'hover' \| 'focus' | 'focus' |
| children | 用于自定义触发元素 | ({value: string, date: Date, disabled: boolean}) => ReactNode | - |
| onChange | 值改变时触发的事件 | (date: Date \| null, value: string) => void | - |
| onFocus | 输入框获取焦点时触发的事件 | (e: FormEvent) => void | - |
| onBlur | 输入框失去焦点时触发的事件 | (e: FormEvent) => void | - |
| onKeyDown | 输入框获取按下键盘时触发的事件 | (e: FormEvent) => void | - |
