import './Progress.less'

import * as React from 'react'

import Base, {ColorType} from '../../commons/Base'
import * as numberUtil from '../../utils/number'

const defaultFormat = (percent: number) => percent + '%'

export interface IProgressProps {
  percent?: number
  active?: boolean
  type?: ColorType
  textPlacement?: 'right' | 'left' | 'inner' | 'none'
  strokeWidth?: number
  format?: (percent: number) => React.ReactNode
}

export interface IProgressState {}

export default class Progress extends Base<IProgressProps, IProgressState> {

  render () {
    const {
      active,
      type = 'primary',
      strokeWidth = 4,
      percent: _percent = 0,
      textPlacement = 'right',
      format = defaultFormat
    } = this.props

    const percent = numberUtil.clamp(_percent, 0, 100)

    const percentText = format(percent)

    const className = this.className(
      'bui-progress',
      `bui-progress--${type}`,
      active && 'bui-progress--active'
    )

    const innerStyle = this.style({
      width: percent + '%',
      paddingTop: strokeWidth / 2 + 'px',
      paddingBottom: strokeWidth / 2 + 'px'
    })

    return (
      <div
        className={className}
        style={this.style()}
      >
        {textPlacement === 'left' && (
          <div className='bui-progress__text'>{percentText}</div>
        )}
        <div className='bui-progress__outer'>
          <div className='bui-progress__inner' style={innerStyle}>
            {textPlacement === 'inner' && (
              <div className='bui-progress__text'>{percentText}</div>
            )}
          </div>
        </div>
        {textPlacement === 'right' && (
          <div className='bui-progress__text'>{percentText}</div>
        )}
      </div>
    )
  }
}
