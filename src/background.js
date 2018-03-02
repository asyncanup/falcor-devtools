'use strict';

/* global chrome */
var log = console.log.bind(console);
log('background');

var ports = {};
chrome.runtime.onConnect.addListener(function(port) {
  log('runtime connected');
  var tab = null;
  var name = null;
  if (isNumeric(port.name)) {
    tab = port.name;
    name = 'devtools';
    installContentScript(+port.name);
  } else {
    tab = port.sender.tab.id;
    name = 'content-script';
  }
  log('tab', tab);
  log('name', name);

  if (!ports[tab]) {
    log('adding port for tab', tab);
    ports[tab] = {
      devtools: null,
      'content-script': null,
    };
  }
  ports[tab][name] = port;

  if (ports[tab].devtools && ports[tab]['content-script']) {
    doublePipe(ports[tab].devtools, ports[tab]['content-script']);
  }
});

function isNumeric(str) {
  return +str + '' === str;
}

function installContentScript(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'content.js' }, function() {});
}

function doublePipe(one, two) {
  log('setting up double pipe');
  one.onMessage.addListener(lOne);
  function lOne(message) {
    log('devtools -> content-script', message);
    two.postMessage(message);
  }
  two.onMessage.addListener(lTwo);
  function lTwo(message) {
    log('content-script -> devtools', message);
    one.postMessage(message);
  }
  function shutdown() {
    log('double pipe shutdown');
    one.onMessage.removeListener(lOne);
    two.onMessage.removeListener(lTwo);
    one.disconnect();
    two.disconnect();
  }
  one.onDisconnect.addListener(shutdown);
  two.onDisconnect.addListener(shutdown);
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  log('message from runtime', msg);
  if (msg.falcorDetected && sender.tab) {
    log('detected falcor in tab', sender.tab.id);
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: {
        '32': 'icon-enabled.png',
      },
    });
    chrome.browserAction.setPopup({
      tabId: sender.tab.id,
      popup: 'popup-enabled.html',
    });
  }
});

