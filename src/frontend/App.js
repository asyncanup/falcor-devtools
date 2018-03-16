import React, { Component } from 'react';
import bytes from 'bytes';

const log = console.log.bind(console);

import './App.css';

class App extends Component {
  _cacheSub: null

  state = {
    // cache: {},
    cacheSize: 0,
    nodeCounts: {},
  }

  SUBSCRIPTION_FIELDS = [
    // 'cache',
    'cacheSize',
    'nodeCounts',
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
    const { cacheSize, nodeCounts } = this.state;
    const humanizedCacheSize = bytes(cacheSize, {
      unitSeparator: ' ',
      unit: 'B',
      thousandsSeparator: ',',
    });
    return (
      <div className="stats-container">
        <div className="cache-size-container">
          <div className="cache-size-title">Cache Size:</div>
          <div className="cache-size-value">{ bytes(cacheSize) }</div>
        </div>
        <div className="node-count-container">
          <div className="node-count-title">Node counts:</div>
          <div className="node-count-row-container">
            { Object.keys(nodeCounts).map(nodeName => (
              <div className="node-count-row" key={ nodeName }>
                <div className="node-count-row-title">{ nodeName }</div>
                <div className="node-count-row-value">{ nodeCounts[nodeName] }</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;

