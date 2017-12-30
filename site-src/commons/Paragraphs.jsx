import {Base} from 'bright-ui'
import React from 'react'
import PropTypes from 'prop-types'

export default class Paragraphs extends Base {
  render () {
    const {total = 3} = this.props

    return (
      <div
        className={this.className('Paragraphs')}
        style={this.style()}
      >
        {Array(total).fill(0).map((_, i) => (
          <div key={i} className='Paragraphs__item'/>
        ))}
      </div>
    )
  }
}

Paragraphs.propTypes = {
  total: PropTypes.number
}
