import './ScrollBar.less'

import * as React from 'react'

import Base from '../../common/Base'

export interface IPoint {
  x: number
  y: number
}

export interface IScrollBarProps extends React.HTMLProps<HTMLDivElement> {
  scrollStep?: number
  direction?: 'vertical' | 'horizontal'
  stopPropagation?: boolean
  dragToScroll?: boolean
}

export interface IScrollBarState {
  dragging: boolean
}

export default class ScrollBar extends Base<IScrollBarProps, IScrollBarState> {
  static defaultProps = {
    direction: 'vertical'
  }

  state = {
    dragging: false
  }

  el: HTMLDivElement
  startPosition: IPoint
  startPoint: IPoint

  get directionProp () {
    return this.props.direction === 'horizontal' ? 'scrollLeft' : 'scrollTop'
  }

  saveEl = (el: HTMLDivElement) => {
    this.el = el
  }

  componentDidMount () {
    this.el.addEventListener('mousewheel', this.onMouseWheel)
    if (this.props.dragToScroll) {
      window.addEventListener('mousedown', this.onMouseDown)
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    }
  }

  componentWillUnmount () {
    if (this.el) {
      this.el.removeEventListener('mousewheel', this.onMouseWheel)
      if (this.props.dragToScroll) {
        window.removeEventListener('mousedown', this.onMouseDown)
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('mouseup', this.onMouseUp)
      }
    }
  }

  scrollTo = (target: number) => {
    this.el[this.directionProp] = target
  }

  scrollToEnd = () => {
    if (this.el) {
      const {direction} = this.props

      if (direction === 'horizontal') {
        const {scrollWidth, clientWidth} = this.el
        this.el.scrollLeft = scrollWidth - clientWidth
      } else {
        const {scrollHeight, clientHeight} = this.el
        this.el.scrollTop = scrollHeight - clientHeight
      }
    }
  }
  
  onMouseWheel = (e: any) => {
    const {scrollStep, stopPropagation} = this.props
    e.preventDefault()

    const step = scrollStep && (e.wheelDelta > 0 ? scrollStep : -scrollStep) || e.wheelDelta

    this.el[this.directionProp] -= step

    if (stopPropagation && this.el.scrollHeight > this.el.clientHeight) {
      e.stopPropagation()
    }
  }
  
  onMouseDown = (e: MouseEvent) => {
    if (
      !this.el
      || !e.target
      || !this.el.contains(e.target as any)
    ) {
      return
    }
    
    this.startPosition = {
      x: this.el.scrollLeft,
      y: this.el.scrollTop
    }

    this.startPoint = {
      x: e.clientX,
      y: e.clientY
    }

    document.body.style.cursor = 'move'
    document.body.style.userSelect = 'none'
    this.setState({dragging: true})
  }

  onMouseMove: any = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.dragging) {
      const direction = this.props.direction
      const x = e.clientX
      const y = e.clientY

      if (direction === 'horizontal') {
        this.el.scrollLeft = this.startPosition.x - (x - this.startPoint.x)
      } else {
        this.el.scrollTop = this.startPosition.y - (y - this.startPoint.y)
      }
    }
  }

  onMouseUp: any = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.cursor = null
    document.body.style.userSelect = null
    this.setState({dragging: false})
  }

  render () {
    const {direction, children, stopPropagation, scrollStep, ...rest} = this.props
    const {dragging} = this.state

    const className = this.className(
      'bui-scroll-bar',
      `bui-scroll-bar--${direction}`,
      {'bui-scroll-bar--dragging': dragging}
    )

    return (
      <div
        {...rest}
        ref={this.saveEl}
        className={className}
        style={this.style()}
      >
        {children}
      </div>
    )
  }
}
