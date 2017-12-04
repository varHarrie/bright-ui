import * as React from 'react'
import InputNumber from '../InputNumber'

export interface IGotoProps {
  current: number
  total: number
  onConfirm: (page: number) => void
}

export interface IGotoState {
  page: number
}

export default class Goto extends React.Component<IGotoProps, IGotoState> {
  constructor (props: IGotoProps) {
    super(props)

    this.state = {page: props.current}
  }

  componentWillReceiveProps ({current}: IGotoProps) {
    this.setState({page: current})
  }

  onChange = (e: any, page: number) => {
    this.setState({page})
  }

  onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      this.props.onConfirm(this.state.page)
    }
  }

  render () {
    const {total} = this.props
    const {page} = this.state

    return (
      <div className='bui-pagination__goto'>
        <span>Goto</span>
        <InputNumber
          className='bui-pagination__goto-input'
          min={1}
          max={total}
          value={page}
          showHandlers={false}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}/>
        <span>/ {total}</span>
      </div>
    )
  }
}
