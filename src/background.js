'use strict';

/* global chrome */
var log = console.log.bind(console);
log('background');

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

