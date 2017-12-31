---
category: 容器
columns: double
title: SidePanel
subtitle: 侧边面板
---

## 基本用法

从侧边画出，可配合`Mask`一起使用

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import Browser from '../../commons/Browser'
import {SidePanel, Button, Mask} from 'bright-ui'

export default class SidePanelNormal extends React.Component {

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
        <Browser>
          <div style={{position: 'relative', overflow: 'hidden', padding: '10px', height: '100%'}}>
            <Paragraphs className='mb10' total={10}/>
            <Button onClick={this.onToggle}>show</Button>
            <Mask
              visible={this.state.visible}
              onClick={this.onToggle}/>
            <SidePanel
              width={300}
              visible={this.state.visible}
              header={(
                <div>Side Panel</div>
              )}
            >
              <Paragraphs className='mb10' total={8}/>
              <Button onClick={this.onToggle}>hide</Button>
            </SidePanel>
          </div>
        </Browser>
      </div>
    )
  }
}
```

## 固定

固定到body

```js
import React from 'react'
import Paragraphs from '../../commons/Paragraphs'
import Browser from '../../commons/Browser'
import {SidePanel, Button, Mask} from 'bright-ui'

export default class SidePanelFixed extends React.Component {

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
        <Browser>
          <div style={{position: 'relative', overflow: 'hidden', padding: '10px', height: '100%'}}>
            <Paragraphs className='mb10' total={10}/>
            <Button onClick={this.onToggle}>show</Button>
            <Mask
              fixed
              visible={this.state.visible}
              onClick={this.onToggle}/>
            <SidePanel
              fixed
              width={300}
              visible={this.state.visible}
              header={(
                <div>Side Panel</div>
              )}
            >
              <Paragraphs className='mb10' total={8}/>
              <Button onClick={this.onToggle}>hide</Button>
            </SidePanel>
          </div>
        </Browser>
      </div>
    )
  }
}
```

## SidePanel API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| header | 头部 | ReactNode | - |
| placement | 位置 | 'left' \| 'right' | 'left' |
| fixed | 固定到body | boolean | false |
| visible | 是否显示 | boolean | false |
| width | 宽度 | number \| string | '700px' |
