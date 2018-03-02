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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('content');\n\n// proxy from main page to devtools (via the background page)\nvar port = chrome.runtime.connect({\n  name: 'content-script'\n});\n\nport.onMessage.addListener(handleMessageFromDevtools);\nport.onDisconnect.addListener(handleDisconnect);\nwindow.addEventListener('message', handleMessageFromPage);\n\nlog('posting hello');\nwindow.postMessage({\n  source: 'falcor-devtools-content-script',\n  hello: true\n}, '*');\n\nfunction handleMessageFromDevtools(message) {\n  log('message from devtools', message);\n  window.postMessage({\n    source: 'falcor-devtools-content-script',\n    payload: message\n  }, '*');\n}\n\nfunction handleMessageFromPage(evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-devtools-bridge') {\n    log('message from page', evt.data);\n    port.postMessage(evt.data.payload);\n  }\n}\n\nfunction handleDisconnect() {\n  log('content disconnect');\n  window.removeEventListener('message', handleMessageFromPage);\n  window.postMessage({\n    source: 'falcor-devtools-content-script',\n    payload: {\n      type: 'event',\n      evt: 'shutdown'\n    }\n  }, '*');\n}\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29udGVudC5qcz85NWZmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xuY29uc3QgbG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbmxvZygnY29udGVudCcpO1xuXG4vLyBwcm94eSBmcm9tIG1haW4gcGFnZSB0byBkZXZ0b29scyAodmlhIHRoZSBiYWNrZ3JvdW5kIHBhZ2UpXG52YXIgcG9ydCA9IGNocm9tZS5ydW50aW1lLmNvbm5lY3Qoe1xuICBuYW1lOiAnY29udGVudC1zY3JpcHQnLFxufSk7XG5cbnBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKGhhbmRsZU1lc3NhZ2VGcm9tRGV2dG9vbHMpO1xucG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoaGFuZGxlRGlzY29ubmVjdCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VGcm9tUGFnZSk7XG5cbmxvZygncG9zdGluZyBoZWxsbycpO1xud2luZG93LnBvc3RNZXNzYWdlKHtcbiAgc291cmNlOiAnZmFsY29yLWRldnRvb2xzLWNvbnRlbnQtc2NyaXB0JyxcbiAgaGVsbG86IHRydWUsXG59LCAnKicpO1xuXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlRnJvbURldnRvb2xzKG1lc3NhZ2UpIHtcbiAgbG9nKCdtZXNzYWdlIGZyb20gZGV2dG9vbHMnLCBtZXNzYWdlKTtcbiAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICBzb3VyY2U6ICdmYWxjb3ItZGV2dG9vbHMtY29udGVudC1zY3JpcHQnLFxuICAgIHBheWxvYWQ6IG1lc3NhZ2UsXG4gIH0sICcqJyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VGcm9tUGFnZShldnQpIHtcbiAgaWYgKGV2dC5zb3VyY2UgPT09IHdpbmRvdyAmJiBldnQuZGF0YSAmJiBldnQuZGF0YS5zb3VyY2UgPT09ICdmYWxjb3ItZGV2dG9vbHMtYnJpZGdlJykge1xuICAgIGxvZygnbWVzc2FnZSBmcm9tIHBhZ2UnLCBldnQuZGF0YSk7XG4gICAgcG9ydC5wb3N0TWVzc2FnZShldnQuZGF0YS5wYXlsb2FkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEaXNjb25uZWN0KCkge1xuICBsb2coJ2NvbnRlbnQgZGlzY29ubmVjdCcpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2VGcm9tUGFnZSk7XG4gIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgc291cmNlOiAnZmFsY29yLWRldnRvb2xzLWNvbnRlbnQtc2NyaXB0JyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgZXZ0OiAnc2h1dGRvd24nLFxuICAgIH0sXG4gIH0sICcqJyk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb250ZW50LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0EiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);