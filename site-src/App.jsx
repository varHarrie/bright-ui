import 'bright-ui/index.css'
import './styles/index.less'

import {Col, Divider, Icon, Input, Row, ScrollBar, List} from 'bright-ui'
import React from 'react'

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      searchKey: ''
    }

    this.onSearchKeyChange = this.onSearchKeyChange.bind(this)
    this.onSearchKeyClear = this.onSearchKeyClear.bind(this)
  }

  onSearchKeyChange (e, searchKey) {
    this.setState({searchKey})
  }

  onSearchKeyClear () {
    this.setState({searchKey: ''})
  }

  render () {
    const {searchKey} = this.state
    const components = []

    return (
      <div className="App">
        <Row className="App__wrapper">
          <Col className="App__header" xs={24} sm={24} md={8} lg={6} xl={6}>
            <h1 className='App__title'>
              Bright UI
              <div className="App__subtitle">
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
              <List>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item selected>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
                <List.Item>test</List.Item>
              </List>
            </ScrollBar>
          </Col>
          <Col className="App__container" xs={24} sm={24} md={16} lg={18} xl={18}>
            test
          </Col>
        </Row>
      </div>
    )
  }
}
