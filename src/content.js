'use strict';

/* global chrome */

// proxy from main page to devtools (via the background page)
var port = chrome.runtime.connect({
  name: 'content-script',
});

port.onMessage.addListener(handleMessageFromDevtools);
port.onDisconnect.addListener(handleDisconnect);
window.addEventListener('message', handleMessageFromPage);

window.postMessage({
  source: 'falcor-devtools-content-script',
  hello: true,
}, '*');

function handleMessageFromDevtools(message) {
  window.postMessage({
    source: 'falcor-devtools-content-script',
    payload: message,
  }, '*');
}

function handleMessageFromPage(evt) {
  if (evt.source === window && evt.data && evt.data.source === 'falcor-devtools-bridge') {
    // console.log('page -> rep -> dev', evt.data);
    port.postMessage(evt.data.payload);
  }
}

function handleDisconnect() {
  window.removeEventListener('message', handleMessageFromPage);
  window.postMessage({
    source: 'falcor-devtools-content-script',
    payload: {
      type: 'event',
      evt: 'shutdown',
    },
  }, '*');
}

