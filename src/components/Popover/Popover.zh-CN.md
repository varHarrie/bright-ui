---
category: 弹出层
columns: single
title: Popover
subtitle: 气泡
---

## 基本用法

使用`placement`设置气泡位置

```js
import React from 'react'
import {Popover, Button, Input, Icon} from 'bright-ui'

export default class PopoverNormal extends React.Component {
  render () {
    return (
      <div className='PopoverNormal' style={{marginLeft: '30px'}}>
        <div className='mb10'>
          <Popover content='top-start' placement='top-start'><Button icon='circle-o'/></Popover>
          <Popover content='top' placement='top'><Button icon='circle-o'/></Popover>
          <Popover content='top-end' placement='top-end'><Button icon='circle-o'/></Popover>
        </div>

        <div className='mb10'>
          <Popover content='left-start' placement='left-start'><Button icon='circle-o'/></Popover>
          <Button icon='times'/>
          <Popover content='right-start' placement='right-start'><Button icon='circle-o'/></Popover>
        </div>

        <div className='mb10'>
          <Popover content='left' placement='left'><Button icon='circle-o'/></Popover>
          <Button icon='times'/>
          <Popover content='right' placement='right'><Button icon='circle-o'/></Popover>
        </div>

        <div className='mb10'>
          <Popover content='left-end' placement='left-end'><Button icon='circle-o'/></Popover>
          <Button icon='times'/>
          <Popover content='right-end' placement='right-end'><Button icon='circle-o'/></Popover>
        </div>

        <div>
          <Popover content='bottom-start' placement='bottom-start'><Button icon='circle-o'/></Popover>
          <Popover content='bottom' placement='bottom'><Button icon='circle-o'/></Popover>
          <Popover content='bottom-end' placement='bottom-end'><Button icon='circle-o'/></Popover>
        </div>
      </div>
    )
  }
}
```

## 触发方式

设置触发显示隐藏的方式

```js
import React from 'react'
import {Popover, Button, Input, Icon} from 'bright-ui'

export default class PopoverTrigger extends React.Component {
  render () {
    return (
      <div>
        <Popover content='content'>
          <Button>click</Button>
        </Popover>
        <Popover content='content' trigger='hover'>
          <Button>hover</Button>
        </Popover>
        <Popover content='content' trigger='focus'>
          <Input placeholder='focus'/>
        </Popover>
      </div>
    )
  }
}
```

## 标题

```js
import React from 'react'
import {Popover, Button, Input, Icon} from 'bright-ui'

export default class PopoverTitle extends React.Component {
  render () {
    return (
      <div>
        <Popover
          width={300}
          title={(
            <Icon name='diamond'>JavaScript Guide</Icon>
          )} content={(
            <div>
              A much more detailed guide to the JavaScript language, 
              aimed at those with previous programming experience either in JavaScript or another language.
            </div>
          )}
        >
          <Button>click</Button>
        </Popover>
      </div>
    )
  }
}
```

## 显示隐藏

使用代码控制显示隐藏

```js
import React from 'react'
import {Popover, Button, Input, Icon} from 'bright-ui'

export default class PopoverVisible extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }

    this.onChange = this.onChange.bind(this)
    this.onToggle = this.onToggle.bind(this)
  }

  onChange (visible) {
    this.setState({visible})
  }

  onToggle () {
    this.setState({visible: !this.state.visible})
  }

  render () {
    return (
      <div>
        <Popover
          width={300}
          title={(
            <Icon name='diamond'>JavaScript Guide</Icon>
          )} content={(
            <div>
              A much more detailed guide to the JavaScript language, 
              aimed at those with previous programming experience either in JavaScript or another language.
              <div style={{marginTop: '8px'}}>
                <Button type='primary' size='small' icon='check' onClick={this.onToggle}>OK</Button>
              </div>
            </div>
          )}
        >
          <Button basic type='primary'>click</Button>
        </Popover>
      </div>
    )
  }
}
```

## 确认气泡

弹出气泡，提醒用户进一步确认

```js
import React from 'react'
import {Popover, Button} from 'bright-ui'

export default class PopoverConfirmNormal extends React.Component {
  render () {
    return (
      <div>
        <Popover.Confirm
          content='Are you sure?'
          onConfirm={() => console.log('confirm')}
          onCancel={() => console.log('cancel')}
        >
          <Button type='danger'>Delete</Button>
        </Popover.Confirm>
      </div>
    )
  }
}
```

## Popover API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| showArrow | 是否显示箭头 | boolean | true |
| trigger | 触发方式 | 'click' \| 'hover' \| 'focus' | 'click' |
| placement | 显示位置 | 'auto' \| 'top' \| 'top-start' \| 'top-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' | 'top' |
| title | 标题 | ReactNode | - |
| content | 内容 | ReactNode | - |
| onChange | 显示或隐藏时触发的事件 | (visible: boolean) => void | - |

## Popover.Confirm API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| confirmType | 确定按钮颜色类型 | 'default' \| 'plain' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'white' \| 'black' | 'primary'
| cancelType | 取消按钮颜色类型 | 'default' \| 'plain' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'white' \| 'black' | - |
| confirmText | 确定按钮文本 | string | '确定' |
| cancelText | 取消按钮文本 | string | '取消' |
| confirmIcon | 确定按钮图标 | string | - |
| cancelIcon | 取消按钮图标 | string | - |
| onConfirm | 点击确定按钮触发的事件 | (e: MouseEvent) => void | - |
| onCancel | 点击取消按钮触发的事件 | (e: MouseEvent) => void | - |
