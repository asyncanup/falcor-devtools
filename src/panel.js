'use strict';

var log = console.log.bind(console);
log('panel');

var config = {
  reload,
};

var Panel = require('./frontend/App');
var React = require('react');
var ReactDOM = require('react-dom');

var node = document.getElementById('container');

function reload() {
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(node);
    node.innerHTML = '';
    ReactDOM.render(<Panel {...config} />, node);
  }, 100);
}

ReactDOM.render(<Panel {...config} />, node);

