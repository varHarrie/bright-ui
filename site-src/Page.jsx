import React from 'react'
import {Divider, ScrollBar} from 'bright-ui'

import * as components from './components'
import WaterFall from './commons/WaterFall'
import Example from './commons/Example'

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

    const {meta, demos, apis} = this.component

    return (
      <ScrollBar className="Page">
        <div className="Page__header">
          <h2 className="Page__title">
            {meta.title}
            <span>{meta.subtitle}</span>
          </h2>
          <Divider/>
        </div>
        <div className="Page__sections">
          <WaterFall
            items={demos}
            columns={meta.columns}
            template={(demo) => (
              <Example
                key={demo.key}
                title={demo.title}
                description={demo.description}
                raw={demo.raw}
                component={demo.component}
              />
            )}
          />
          {apis.map((api) => (
            <Example key={api.key} title='API' description={api.table}/>
          ))}
        </div>
      </ScrollBar>
    )
  }
}
