import 'bright-ui/index.css'
import './styles/index.less'

import React from 'react'
import {withRouter} from 'react-router'
import {Route, Link} from 'react-router-dom'
import {Col, Divider, Icon, Input, Row, ScrollBar, List} from 'bright-ui'

import Page from './Page'
import components from './components'

const logo = require('./assets/logo.png')

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      searchKey: ''
    }

    this.onSearchKeyChange = this.onSearchKeyChange.bind(this)
    this.onSearchKeyClear = this.onSearchKeyClear.bind(this)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
  }

  onSearchKeyChange (e, searchKey) {
    this.setState({searchKey: searchKey.toLowerCase()})
  }

  onSearchKeyClear () {
    this.setState({searchKey: ''})
  }

  onClickMenuItem (e, value) {
    this.props.history.push(this.props.match.url + value)
  }

  render () {
    const {searchKey} = this.state
    const url = this.props.location.pathname.slice(1)
    const filteredComponents = components.filter((c) => c.meta.title.toLowerCase().indexOf(searchKey) > -1)

    return (
      <div className='App'>
        <Row className='App__wrapper'>
          <Col className='App__header' xs={24} sm={24} md={8} lg={6} xl={6}>
            <h1 className='App__title'>
              <img className='App__logo' src={logo} alt='Bright UI'/>
              <sup className='App__version'>v0.1</sup>
              <div className='App__subtitle'>
                React Components
              </div>
            </h1>
            <Divider/>
            <Input
              full
              value={searchKey}
              placeholder={`A total of ${components.length}`}
              suffix={(
                <Icon name={searchKey ? 'close' : 'search'} color='gray' onClick={this.onSearchKeyClear}/>
              )}
              onChange={this.onSearchKeyChange}/>
            <ScrollBar className='App__menu'>
              <List size='small'>
                <a href='https://github.com/varHarrie/bright-ui'>
                  <List.Item><Icon name='github'>GitHub</Icon></List.Item>
                </a>
                <Link to='/'>
                  <List.Item selected={url === ''}><Icon name='book'>快速上手</Icon></List.Item>
                </Link>
                {filteredComponents.map((component) => (
                  <List.Item
                    key={component.meta.title}
                    selected={url === component.meta.title}
                    value={component.meta.title}
                    onClick={this.onClickMenuItem}>
                    {component.meta.title}&nbsp;{component.meta.subtitle || ''}
                  </List.Item>
                ))}
              </List>
            </ScrollBar>
          </Col>
          <Col className='App__container' xs={24} sm={24} md={16} lg={18} xl={18}>
            <Route path='/:name?' component={Page}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(App)
