'use strict';

/* global chrome */
var log = console.log.bind(console);
log('panel');

function checkForFalcor(done) {
  log('checking for falcor');
  chrome.devtools.inspectedWindow.eval(`!!(
    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length ||
    window.Falcor ||
    (window.require && require('falcor'))
  )`, function(falcorDetected, err) {
    log('falcor detected?', falcorDetected);
    done(falcorDetected);
  });
}

function inject(scriptName, done) {
  var src = `
  // the prototype stuff is in case document.createElement has been modified
  (function () {
    var script = document.constructor.prototype.createElement.call(document, 'script');
    script.src = "${scriptName}";
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
  })()
  `;

  chrome.devtools.inspectedWindow.eval(src, function(res, err) {
    if (err) {
      console.log(err);
    }
    done();
  });
}

var config = {
  checkForFalcor,
  reload,
  reloadSubscribe(reloadFn) {
    chrome.devtools.network.onNavigated.addListener(reloadFn);
    return () => {
      chrome.devtools.network.onNavigated.removeListener(reloadFn);
    };
  },
  inject(done) {
    inject(chrome.runtime.getURL('backend.js'), () => {
      var port = chrome.runtime.connect({
        name: '' + chrome.devtools.inspectedWindow.tabId,
      });
      var disconnected = false;

      var wall = {
        listen(fn) {
          port.onMessage.addListener(message => fn(message));
        },
        send(data) {
          if (disconnected) {
            return;
          }
          port.postMessage(data);
        },
      };

      port.onDisconnect.addListener(() => {
        disconnected = true;
      });
      done(wall, () => port.disconnect());
    });
  },
};

var Panel = require('./frontend/Panel');
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

