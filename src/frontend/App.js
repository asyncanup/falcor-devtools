import React, { Component } from 'react';
const log = console.log.bind(console);

class App extends Component {
  _cacheSub: null

  state = {
    // cache: {},
    cacheSize: 0,
  }

  SUBSCRIPTION_FIELDS = [
    // 'cache',
    'cacheSize'
  ]

  subscriptions = []

  componentWillMount() {
    this.subscriptions = this.SUBSCRIPTION_FIELDS.map(name =>
      this.props.subscribe(name, value =>
        this.setState({ [name]: value })
      )
    );
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub());
    this.subscriptions = [];
  }

  render() {
    const { cacheSize } = this.state;
    return (
      <div>{ cacheSize }</div>
    );
  }
}

module.exports = App;

