/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('background');\n\nchrome.runtime.onMessage.addListener(function (msg, sender) {\n  log('message from runtime', msg);\n  if (msg.falcorDetected && sender.tab) {\n    log('detected falcor in tab', sender.tab.id);\n    chrome.browserAction.setIcon({\n      tabId: sender.tab.id,\n      path: {\n        '32': 'icon-enabled.png'\n      }\n    });\n    chrome.browserAction.setPopup({\n      tabId: sender.tab.id,\n      popup: 'popup-enabled.html'\n    });\n  }\n});\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmFja2dyb3VuZC5qcz85NjE2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sb2coJ2JhY2tncm91bmQnKTtcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIHNlbmRlcikgPT4ge1xuICBsb2coJ21lc3NhZ2UgZnJvbSBydW50aW1lJywgbXNnKTtcbiAgaWYgKG1zZy5mYWxjb3JEZXRlY3RlZCAmJiBzZW5kZXIudGFiKSB7XG4gICAgbG9nKCdkZXRlY3RlZCBmYWxjb3IgaW4gdGFiJywgc2VuZGVyLnRhYi5pZCk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICB0YWJJZDogc2VuZGVyLnRhYi5pZCxcbiAgICAgIHBhdGg6IHtcbiAgICAgICAgJzMyJzogJ2ljb24tZW5hYmxlZC5wbmcnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRQb3B1cCh7XG4gICAgICB0YWJJZDogc2VuZGVyLnRhYi5pZCxcbiAgICAgIHBvcHVwOiAncG9wdXAtZW5hYmxlZC5odG1sJyxcbiAgICB9KTtcbiAgfVxufSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9iYWNrZ3JvdW5kLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBRkE7QUFJQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);