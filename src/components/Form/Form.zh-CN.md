---
category: 表单
columns: double
title: Form
subtitle: 表单
---

## 基本用法

一个简单的表单

```js
import * as React from 'react'
import {Form, Input} from 'bright-ui'

export default class FormNormal extends React.Component {
  render () {
    return (
      <div>
        <Form>
          <Form.Field label='username'>
            <Input/>
          </Form.Field>
          <Form.Field label='password'>
            <Input type='password'/>
          </Form.Field>
        </Form>
      </div>
    )
  }
}
```

## 完整表单流程

支持数据响应、表单验证、错误信息显示

```js
import * as React from 'react'
import {Form, Input, Button, Icon} from 'bright-ui'

export default class FormReactive extends React.Component {

  constructor (props) {
    super(props)

    this.validations = {
      username: (value: string) => /^[a-zA-Z0-0]{6,20}$/.test(value) || 'username格式不正确',
      password: (value: string) => /^[a-zA-Z0-0]{6,20}$/.test(value) || 'password格式不正确'
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (errors, values) {
    console.log(errors, values)
  }

  render () {
    return (
      <div>
        <Form validations={this.validations} onSubmit={this.onSubmit}>
          <Form.Field label='username' required name='username' value=''>
            {({value, onChange}) => (
              <Input prefix={<Icon name='user'/>} value={value} onChange={onChange}/>
            )}
          </Form.Field>
          <Form.Field label='password' required name='password' value=''>
            {({value, onChange}) => (
              <Input prefix={<Icon name='lock'/>} type='password' value={value} onChange={onChange}/>
            )}
          </Form.Field>
          <Button type='success' nativeType='submit'>submit</Button>
        </Form>
      </div>
    )
  }
}
```

## Form API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| layout | 布局方式 | 'vertical' \| 'horizontal' | 'vertical'
| labelWidth | 标签宽度 | string | number | - |
| validations | 校验对象 | {[string]: (value, values) => boolean \| string} | - |
| showError | 是否显示错误信息 | boolean | true |
| onSubmit | 表单提交时触发的事件 | (errors: any[] | null, values: any, reset: () => void) => void | - |

## Form.Field API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| name | 表单字段key | string | - |
| value | 表单字段值 | any | - |
| required | 是否为必填字段，仅用于样式展示 | boolean | false |
| label | 表单字段标题 | React.ReactNode | - |
| children | 表单内容 | React.ReactNode \| ((props: IChildProps) => React.ReactNode) | - |
