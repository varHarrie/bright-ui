---
category: 数据展示
columns: double
title: Notification
subtitle: 通知
---

## 基本用法

多种类型的通知框

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Notification, Button} from 'bright-ui'

export default class NotificationNormal extends React.Component {
  render () {
    return (
      <div>
        <Notification title='only title'/>
        <br/>
        <Notification title='primary'><Paragraphs/></Notification>
        <br/>
        <Notification title='success' type='success'><Paragraphs/></Notification>
        <br/>
        <Notification title='warning' type='warning'><Paragraphs/></Notification>
        <br/>
        <Notification title='danger' type='danger'><Paragraphs/></Notification>
      </div>
    )
  }
}
```

## 可关闭

显示关闭按钮

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Notification, Button} from 'bright-ui'

export default class NotificationClosable extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      visible: true
    }

    this.onClose = this.onClose.bind(this)
  }

  onClose () {
    this.setState({visible: false})
  }

  render () {
    return (
      <div>
        <div>
        <Notification closable title='only title'/>
        <br/>
        <Notification closable title='primary'><Paragraphs/></Notification>
        <br/>
        <Notification closable title='success' type='success'><Paragraphs/></Notification>
        <br/>
        <Notification closable title='warning' type='warning'><Paragraphs/></Notification>
        <br/>
        <Notification closable title='danger' type='danger'><Paragraphs/></Notification>
      </div>
      </div>
    )
  }
}
```

## 使用函数调用

使用函数快速调用

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Notification, Button} from 'bright-ui'

export default class NotificationFunctional extends React.Component {

  constructor (props) {
    super(props)

    this.onNotificationInfo = this.onNotificationInfo.bind(this)
    this.onNotificationSuccess = this.onNotificationSuccess.bind(this)
    this.onNotificationWarning = this.onNotificationWarning.bind(this)
    this.onNotificationDanger = this.onNotificationDanger.bind(this)
  }

  onNotificationInfo () {
    Notification.info({title: 'info', content: 'content', placement: 'top-left'})
  }

  onNotificationSuccess () {
    Notification.success({title: 'success', content: 'content', placement: 'top-right'})
  }

  onNotificationWarning () {
    Notification.warning({title: 'warning', content: 'content', placement: 'bottom-left'})
  }

  onNotificationDanger () {
    Notification.danger({title: 'danger', content: 'content', placement: 'bottom-right'})
  }

  render () {
    return (
      <div>
        <Button basic type='primary' onClick={this.onNotificationInfo}>info</Button>
        <Button basic type='success' onClick={this.onNotificationSuccess}>success</Button>
        <Button basic type='warning' onClick={this.onNotificationWarning}>warning</Button>
        <Button basic type='danger' onClick={this.onNotificationDanger}>danger</Button>
      </div>
    )
  }
}
```

## Notification API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | true |
| type | 类型 | 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' |
| title | 标题 | string | - |
| icon | 图标 | string | - |
| closable | 显示关闭按钮 | boolean | false |
| duration | 持续时间 | number | - |
| onClose | 点击关闭按钮时触发的事件 | () => void | - |
