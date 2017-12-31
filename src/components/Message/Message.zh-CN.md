---
category: 数据展示
columns: double
title: Message
subtitle: 消息提示
---

## 基本用法

用于展示简短文本提示

```js
import React from 'react'
import {Message, Button} from 'bright-ui'

export default class MessageNormal extends React.Component {
  render () {
    return (
      <div>
        <Message>primary</Message>
        <br/>
        <Message type='success'>success</Message>
        <br/>
        <Message type='warning'>warning</Message>
        <br/>
        <Message type='danger'>danger</Message>
      </div>
    )
  }
}
```

## 可关闭

显示关闭按钮

```js
import React from 'react'
import {Message, Button} from 'bright-ui'

export default class MessageClosable extends React.Component {
  render () {
    return (
      <div>
        <Message closable>primary</Message>
        <br/>
        <Message closable type='success'>success</Message>
        <br/>
        <Message closable type='warning'>warning</Message>
        <br/>
        <Message closable type='danger'>danger</Message>
      </div>
    )
  }
}
```

## 使用函数调用

使用函数快速调用

```js
import React from 'react'
import {Message, Button} from 'bright-ui'

export default class MessageFunctional extends React.Component {

  constructor (props) {
    super(props)

    this.onMessageInfo = this.onMessageInfo.bind(this)
    this.onMessageSuccess = this.onMessageSuccess.bind(this)
    this.onMessageWarning = this.onMessageWarning.bind(this)
    this.onMessageDanger = this.onMessageDanger.bind(this)
  }

  onMessageInfo () {
    Message.info('info')
  }

  onMessageSuccess () {
    Message.success('success')
  }

  onMessageWarning () {
    Message.warning('warning')
  }

  onMessageDanger () {
    Message.danger('danger')
  }

  render () {
    return (
      <div>
        <Button basic type='primary' onClick={this.onMessageInfo}>info</Button>
        <Button basic type='success' onClick={this.onMessageSuccess}>success</Button>
        <Button basic type='warning' onClick={this.onMessageWarning}>warning</Button>
        <Button basic type='danger' onClick={this.onMessageDanger}>danger</Button>
      </div>
    )
  }
}
```

## Message API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | true |
| type | 类型 | 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' |
| icon | 图标 | string | - |
| closable | 显示关闭按钮 | boolean | false |
| duration | 持续时间 | number | - |
| onClose | 点击关闭按钮时触发的事件 | () => void | - |
