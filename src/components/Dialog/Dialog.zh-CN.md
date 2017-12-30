---
category: 弹出层
columns: double
title: Dialog
subtitle: 对话框
---

## 基本用法

一个基本的对话框

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class DialogNormal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    this.onToggle = this.onToggle.bind(this)
  }

  onToggle () {
    this.setState({visible: !this.state.visible})
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={this.onToggle}>open</Button>
        <Dialog
          title='对话框'
          visible={this.state.visible}
          onConfirm={this.onToggle}
          onClose={this.onToggle}>
          内容
        </Dialog>
      </div>
    )
  }
}
```

## 异步关闭

返回`Promise`，让对话框显示加载中的状态

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class DialogPromise extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    this.onToggle = this.onToggle.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
  }

  onToggle () {
    this.setState({visible: !this.state.visible})
  }

  onConfirm () {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({visible: false})
        resolve()
      }, 2000)
    })
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={this.onToggle}>open</Button>
        <Dialog
          title='对话框'
          visible={this.state.visible}
          closeOnMaskClick={false}
          onConfirm={this.onConfirm}
          onClose={this.onToggle}>
          内容
        </Dialog>
      </div>
    )
  }
}
```

## 确认对话框

使用预设的确认对话框

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class ConfirmNormal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    this.onToggle = this.onToggle.bind(this)
  }

  onToggle () {
    this.setState({visible: !this.state.visible})
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={this.onToggle}>confirm</Button>
        <Dialog.Confirm
          visible={this.state.visible}
          onConfirm={this.onToggle}
          onClose={this.onToggle}>
          内容
        </Dialog.Confirm>
      </div>
    )
  }
}
```

## 使用函数调用确认对话框

使用`Dialog.confirm(options)`快速弹出对话框

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class ConfirmFunctional extends React.Component {

  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    Dialog.confirm({
      title: '标题',
      content: '内容',
      onConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('confirm')
            resolve()
          }, 1000)
        })
      },
      onCancel: () => {
        console.log('cancel')
      }
    })
  }

  render () {
    return (
      <div>
        <Button basic type='primary' onClick={this.onClick}>confirm</Button>
      </div>
    )
  }
}

```

## 输入对话框

使用预设的输入对话框

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class PromptNormal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.onToggle = this.onToggle.bind(this)
  }

  onConfirm (value: string) {
    console.log(value)
    this.setState({visible: false})
  }

  onToggle () {
    this.setState({visible: !this.state.visible})
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={this.onToggle}>prompt</Button>
        <Dialog.Prompt
          icon='pencil-square'
          title='写点什么'
          visible={this.state.visible}
          onConfirm={this.onConfirm}
          onClose={this.onToggle}/>
      </div>
    )
  }
}
```

## 使用函数调用输入对话框

使用`Dialog.prompt(options)`快速弹出对话框

```js
import * as React from 'react'
import {Dialog, Button} from 'bright-ui'

export default class PromptFunctional extends React.Component {

  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    Dialog.prompt({
      title: '标题',
      content: '描述描述描述描述',
      value: '默认值',
      placeholder: '提示',
      onConfirm: (value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('confirm', value)
            resolve()
          }, 1000)
        })
      },
      onCancel: () => {
        console.log('cancel')
      }
    })
  }

  render () {
    return (
      <div>
        <Button basic type='primary' onClick={this.onClick}>prompt</Button>
      </div>
    )
  }
}
```

## Dialog API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| size | 尺寸 | 'small' \| 'normal' \| 'large' | normal |
| visible | 是否可见 | boolean | false |
| plain | 简单模式，去除边框 | boolean | false |
| masked | 是否显示遮罩 | boolean | true |
| closable | 是否显示关闭按钮 | boolean | true |
| closeOnEsc | 按下`ESC`键关闭 | boolean | true |
| closeOnMaskClick | 点击遮罩关闭 | boolean | true |
| transition | 动画效果 | "scale" \| "slide-up" | "scale" |
| container | 渲染到容器 |  HTMLElement \| (() => HTMLElement) | - |
| autoDestroy | 自动销毁容器 | boolean | true |
| header | 头部 | ReactNode | - |
| footer | 尾部 | ReactNode | - |
| icon | 图标 | ReactNode | - |
| title | 标题 | ReactNode | - |
| cancelIcon | 取消按钮图标 | string | - |
| confirmIcon | 确定按钮图标 | string | - |
| cancelType | 取消按钮类型 | 'default' \| 'plain' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'white' \| 'black' | "default" |
| confirmType | 确定按钮类型 | 'default' \| 'plain' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'white' \| 'black' | "primary" |
| cancelText | 取消按钮文本 | ReactNode | "取消" |
| confirmText | 确定按钮文本 | ReactNode | "确定" |
| onConfirm | 点击确定按钮时触发的事件 | () => void \| Promise | - |
| onCancel | 点击取消按钮时触发的事件 | () => void \| Promise | - |
| onClose | 点击关闭按钮时触发的事件 | () => void | - |
| onHide | 对话框隐藏后触发的事件 | () => void | -

## Dialog.Confirm API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | false |
| icon | 图标 | string | "question-circle" |
| title | 标题 | string | "确认" |
| size | 尺寸 | 'small' \| 'normal' \|'circle' | "small" |
| closeOnMaskClick | 点击遮罩关闭 | boolean | false |
| container | 渲染到容器 | HTMLElement \| (() => HTMLElement) | - |
| autoDestroy | 自动销毁容器 | boolean | true
| onConfirm | 点击确定按钮时触发的事件 | () => void \| Promise | - |
| onCancel | 点击取消按钮时触发的事件 | () => void \| Promise | - |
| onClose | 点击关闭按钮时触发的事件 | () => void | - |
| onHide | 对话框隐藏后触发的事件 | () => void|- |

## Dialog.Prompt API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | false |
| value | 输入框默认值 | string | - |
| placeholder | 输入框提示 | string | - |
| icon | 图标 | string | - |
| title | 标题 | string | - |
| size | 尺寸 | 'small' \| 'normal' \|'circle' | "small" |
| closeOnMaskClick | 点击遮罩关闭 | boolean | false |
| container | 渲染到容器 | HTMLElement \| (() => HTMLElement) | - |
| autoDestroy | 自动销毁容器 | boolean | true |
| onConfirm | 点击确定按钮时触发的事件 | () => void \| Promise | - |
| onCancel | 点击取消按钮时触发的事件 | () => void \| Promise | - |
| onClose | 点击关闭按钮时触发的事件 | () => void | - |
| onHide | 对话框隐藏后触发的事件 | () => void | - |
