import React from 'react'
import {Divider} from 'bright-ui'

import * as components from './components'

export default class Page extends React.Component {

  componentWillMount () {
    const name = this.props.match.params.name
    this.component = components[name]
  }

  componentWillReceiveProps (nextProps) {
    const name = nextProps.match.params.name
    this.component = components[name]
  }

  render () {
    if (!this.component) {
      return null
    }

    const {meta, demos} = this.component
    console.log('this.component', this.component)

    return (
      <div className="Page">
        <div className="Page__header">
          <h2 className="Page__title">
            {meta.title}
            <span>{meta.subtitle}</span>
          </h2>
          <Divider/>
        </div>
        {demos.map((demo) => (
          <div className="Page__section" key={demo.name}>
            test
          </div>
        ))}
      </div>
    )
  }
}
