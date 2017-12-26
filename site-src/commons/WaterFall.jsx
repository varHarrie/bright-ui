import React from 'react'
import PropTypes from 'prop-types'

import {Col, Row} from 'bright-ui'

export default class WaterFall extends React.Component {

  constructor (props) {
    super(props)
  }

  isDoubleColumns () {
    return this.props.columns === 'double'
  }

  render () {
    const {template, items} = this.props

    if (this.isDoubleColumns()) {
      const leftItems = this.props.items.filter((item, i) => i % 2 === 0)
      const rightItems = this.props.items.filter((item, i) => i % 2 === 1)

      return (
        <Row className='WaterFall' gutter={8}>
          <Col xs={24} lg={12}>
            {leftItems.map((item, i) => template(item, i))}
          </Col>
          <Col xs={24} lg={12}>
            {rightItems.map((item, i) => template(item, i))}
          </Col>
        </Row>
      )
    }

    return (
      <div>
        {items.map((item, i) => template(item, i))}
      </div>
    )
  }
}

WaterFall.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.string,
  template: PropTypes.func
}
