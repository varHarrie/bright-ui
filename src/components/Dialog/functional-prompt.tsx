import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Base, {SizeType} from '../../commons/Base'
import * as overlayUtil from '../../utils/overlay'
import Prompt from './Prompt'

export interface IPromptOptions {
  icon?: string
  title?: string
  content?: string
  value?: string
  placeholder?: string
  size?: SizeType
  closeOnMaskClick?: boolean
  onConfirm?: (value: string) => void | Promise<any>
  onCancel?: () => void | Promise<any>
}

interface IPromptWrapProps extends IPromptOptions {
  container?: HTMLElement,
  onHide: () => void
}

interface IPromptWrapState {
  visible: boolean
}

class PromptWrap extends Base<IPromptWrapProps, IPromptWrapState> {

  state: IPromptWrapState = {
    visible: true
  }

  onConfirm = (value: string) => {
    const onConfirm = Base.promiseAction(this.props.onConfirm)
    return onConfirm(value)(
      null,
      () => this.setState({visible: false}),
      () => this.setState({visible: false})
    )
  }

  onClose = () => {
    const onCancel = Base.promiseAction(this.props.onCancel)
    return onCancel()(
      null,
      () => this.setState({visible: false}),
      () => this.setState({visible: false})
    )
  }

  render () {
    const {content: children, onConfirm, onCancel, ...props} = this.props
    const {visible} = this.state

    return (
    <Prompt
      {...props}
      visible={visible}
      autoDestroy={false}
      children={children}
      onConfirm={this.onConfirm}
      onClose={this.onClose}/>
    )
  }
}

export default function prompt (options: IPromptOptions) {
  let container: any = overlayUtil.create()

  const onHide = function () {
    setTimeout(() => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container)
        overlayUtil.remove(container)
        container = null
      }
    })
  }

  ReactDOM.render(
    React.createElement(PromptWrap, {...options, container, onHide}),
    container
  )
}
