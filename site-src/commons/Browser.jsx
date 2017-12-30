import React from 'react'
import {Base} from 'bright-ui'

export default class Browser extends Base {

  render () {
    return (
      <div className={this.className('Browser')} style={this.style()}>
        <div className='Browser__header'>
          <div className='Browser__action'/>
          <div className='Browser__action'/>
          <div className='Browser__action'/>
          <div className='Browser__address'/>
        </div>
        <div className='Browser__container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
