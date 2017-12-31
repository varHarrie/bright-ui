---
category: 数据展示
columns: single
title: Progress
subtitle: 进度条
---

## 基本用法

支持多种颜色

```js
import React from 'react'
import {Progress, Button} from 'bright-ui'

export default class ProgressNormal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      percent: 10,
      textPlacement: 'right'
    }

    this.onIncrease = this.onIncrease.bind(this)
    this.onDecrease = this.onDecrease.bind(this)
  }

  onIncrease () {
    const percent = this.state.percent + 15
    this.setState({percent: percent > 100 ? 100 : percent})
  }

  onDecrease () {
    const percent = this.state.percent - 15
    this.setState({percent: percent < -50 ? -50 : percent})
  }

  render () {
    const {percent, textPlacement} = this.state

    return (
      <div>
        <div>
          <Progress className='mb10' percent={percent} textPlacement={textPlacement}/>
          <Progress className='mb10' percent={percent + 10} textPlacement={textPlacement} active/>
          <Progress className='mb10' percent={percent + 20} textPlacement={textPlacement} type='success'/>
          <Progress className='mb10' percent={percent + 30} textPlacement={textPlacement} type='warning'/>
          <Progress className='mb10' percent={percent + 40} textPlacement={textPlacement} type='danger'/>
          <Progress className='mb10' percent={percent + 50} textPlacement={textPlacement} type='gray'/>
        </div>
        <Button.Group>
          <Button basic icon='minus' onClick={this.onDecrease}/>
          <Button basic icon='plus' onClick={this.onIncrease}/>
        </Button.Group>
        <Button.Group>
          <Button basic onClick={() => this.setState({textPlacement: 'left'})}>left</Button>
          <Button basic onClick={() => this.setState({textPlacement: 'inner'})}>inner</Button>
          <Button basic onClick={() => this.setState({textPlacement: 'right'})}>right</Button>
          <Button basic onClick={() => this.setState({textPlacement: 'none'})}>none</Button>
        </Button.Group>
      </div>
    )
  }
}
```

## 宽度

设置进度条粗细

```js
import React from 'react'
import {Progress, Button} from 'bright-ui'

export default class ProgressStrokeWidth extends React.Component {
  render () {
    return (
      <div>
        <Progress percent={15} strokeWidth={1}/>
        <Progress percent={25} strokeWidth={2}/>
        <Progress percent={35} strokeWidth={4}/>
        <Progress percent={45} strokeWidth={6}/>
      </div>
    )
  }
}
```

## Progress API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| percent | 进度值 | number | 0 |
| active | 是否显示进行中样式 | boolean | false |
| type | 样式类型 | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'gray' | 'primary' |
| textPlacement | 文本位置 | 'right' \| 'left' \| 'inner' \| 'none ' |'right' |
| strokeWidth | 宽度 | number | 4 |
| format | 文本格式 | (percent: number) => ReactNode | - |
