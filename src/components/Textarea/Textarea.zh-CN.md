---
category: 表单
columns: double
title: Textarea
subtitle: 多行文本框
---

## 基本用法

一个基本的多行文本框

```js
import React from 'react'
import {Textarea} from 'bright-ui'

export default class TextareaNormal extends React.Component {
  render () {
    return (
      <div>
        <Textarea/>
      </div>
    )
  }
}

```

## Textarea API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| value | 文本框的值 | string | - |
| placeholder | 提示 | string | -
| size | 尺寸 | 'small' \| 'normal' \| 'large' | 'normal' |
| disabled | 是否禁用 | boolean | false |
| full | 层满父容器宽度 | boolean | false |
| autoFocus | 是否自动获取焦点 | boolean | false |
| onChange | 文本框值改变时触发的事件 | (e: ChangeEvent, value: string) => void | - |
| onFocus | 文本框获取焦点时触发的事件 | (e: FormEvent) => void | - |
| onBlur | 文本框失去焦点时触发的事件 | (e: FormEvent) => void | - |
| onKeyDown | 按下键盘时触发的事件 | (e: FormEvent) => void | - |
