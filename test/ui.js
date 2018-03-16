'use strict';

/* global chrome */
var log = console.log.bind(console);
log('ui test');

var config = {
  subscribe(fieldName, fn) {
    return () => {};
  }
};

var Panel = require('../src/frontend/App');
var React = require('react');
var ReactDOM = require('react-dom');

var node = document.getElementById('container');
ReactDOM.render(<Panel {...config} />, node);

