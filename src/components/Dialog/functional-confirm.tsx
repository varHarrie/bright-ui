import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Base, {SizeType} from '../../libs/Base'
import * as OverlayManager from '../../libs/overlay-manager'
import Confirm from './Confirm'

export interface IConfirmOptions {
  icon?: string
  title?: string
  content?: string
  size?: SizeType
  closeOnMaskClick?: boolean
  onConfirm?: () => void | Promise<any>
  onCancel?: () => void | Promise<any>
}

interface IConfirmWrapProps extends IConfirmOptions {
  container?: HTMLElement,
  onHide: () => void
}

interface IConfirmWrapState {
  visible: boolean
}

class ConfirmWrap extends Base<IConfirmWrapProps, IConfirmWrapState> {

  state: IConfirmWrapState = {
    visible: true
  }

  onConfirm = () => {
    const onConfirm = Base.promiseAction(this.props.onConfirm)
    return onConfirm()(
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
    const {onConfirm, onCancel, ...props} = this.props
    const {visible} = this.state

    return (
    <Confirm
      {...props}
      visible={visible}
      autoDestroy={false}
      onConfirm={this.onConfirm}
      onClose={this.onClose}/>
    )
  }
}

export default function confirm (options: IConfirmOptions) {
  let container: any = OverlayManager.create()

  const onHide = function () {
    setTimeout(() => {
      if (container) {
        ReactDOM.unmountComponentAtNode(container)
        OverlayManager.remove(container)
        container = null
      }
    })
  }

  ReactDOM.render(
    React.createElement(ConfirmWrap, {...options, container, onHide}),
    container
  )
}
