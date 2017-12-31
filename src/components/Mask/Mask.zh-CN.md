---
category: 其他
columns: double
title: Mask
subtitle: 遮罩
---

## 基本用法

一个基本的遮罩

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Mask, Button} from 'bright-ui'

export default class MaskNormal extends React.Component {

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
      <div style={{position: 'relative', padding: '10px'}}>
        <Paragraphs className='mb10' total={10}/>
        <Button onClick={this.onToggle}>显示</Button>
        <Mask visible={this.state.visible} onClick={this.onToggle}/>
      </div>
    )
  }
}
```

## 内容

在遮罩上居中显示一些内容

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import {Mask, Button} from 'bright-ui'

export default class MaskContent extends React.Component {

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
        <div style={{position: 'relative', padding: '10px'}}>
          <Paragraphs className='mb10' total={10}/>
          <Button onClick={this.onToggle}>显示</Button>
          <Mask visible={this.state.visible}>
            <div>
              <p>这里可以显示一些内容</p>
              <Button onClick={this.onToggle}>隐藏</Button>
            </div>
          </Mask>
        </div>
      )
    }
  }
```

## Mask API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| visible | 是否显示 | boolean | false |
| fixed | 是否固定到根节点 | boolean | false |
| onClick | 点击遮罩时触发的事件 | (e: React.MouseEvent) => void | - |
