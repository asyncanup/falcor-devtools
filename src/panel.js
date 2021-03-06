'use strict';

/* global chrome */
var log = console.log.bind(console);
log('panel');

var config = {
  subscribe(fieldName, fn) {
    log('subscribing to', fieldName);
    function listener(msg, sender) {
      log('message from runtime', msg);
      if (msg[fieldName]) {
        fn(msg[fieldName]);
      }
    }
    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    }
  }
};

var Panel = require('./frontend/App');
var React = require('react');
var ReactDOM = require('react-dom');

var node = document.getElementById('container');
ReactDOM.render(<Panel {...config} />, node);

