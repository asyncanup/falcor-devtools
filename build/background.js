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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('background');\n\nvar ports = {};\nchrome.runtime.onConnect.addListener(function (port) {\n  log('runtime connected');\n  var tab = null;\n  var name = null;\n  if (isNumeric(port.name)) {\n    tab = port.name;\n    name = 'devtools';\n    installContentScript(+port.name);\n  } else {\n    tab = port.sender.tab.id;\n    name = 'content-script';\n  }\n  log('tab', tab);\n  log('name', name);\n\n  if (!ports[tab]) {\n    log('adding port for tab', tab);\n    ports[tab] = {\n      devtools: null,\n      'content-script': null\n    };\n  }\n  ports[tab][name] = port;\n\n  if (ports[tab].devtools && ports[tab]['content-script']) {\n    doublePipe(ports[tab].devtools, ports[tab]['content-script']);\n  }\n});\n\nfunction isNumeric(str) {\n  return +str + '' === str;\n}\n\nfunction installContentScript(tabId) {\n  chrome.tabs.executeScript(tabId, { file: 'content.js' }, function () {});\n}\n\nfunction doublePipe(one, two) {\n  log('setting up double pipe');\n  one.onMessage.addListener(lOne);\n  function lOne(message) {\n    log('devtools -> content-script', message);\n    two.postMessage(message);\n  }\n  two.onMessage.addListener(lTwo);\n  function lTwo(message) {\n    log('content-script -> devtools', message);\n    one.postMessage(message);\n  }\n  function shutdown() {\n    log('double pipe shutdown');\n    one.onMessage.removeListener(lOne);\n    two.onMessage.removeListener(lTwo);\n    one.disconnect();\n    two.disconnect();\n  }\n  one.onDisconnect.addListener(shutdown);\n  two.onDisconnect.addListener(shutdown);\n}\n\nchrome.runtime.onMessage.addListener(function (msg, sender) {\n  log('message from runtime', msg);\n  if (msg.falcorDetected && sender.tab) {\n    log('detected falcor in tab', sender.tab.id);\n    chrome.browserAction.setIcon({\n      tabId: sender.tab.id,\n      path: {\n        '32': 'icon-enabled.png'\n      }\n    });\n    chrome.browserAction.setPopup({\n      tabId: sender.tab.id,\n      popup: 'popup-enabled.html'\n    });\n  }\n});\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmFja2dyb3VuZC5qcz85NjE2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xuY29uc3QgbG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbmxvZygnYmFja2dyb3VuZCcpO1xuXG52YXIgcG9ydHMgPSB7fTtcbmNocm9tZS5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihwb3J0KSB7XG4gIGxvZygncnVudGltZSBjb25uZWN0ZWQnKTtcbiAgdmFyIHRhYiA9IG51bGw7XG4gIHZhciBuYW1lID0gbnVsbDtcbiAgaWYgKGlzTnVtZXJpYyhwb3J0Lm5hbWUpKSB7XG4gICAgdGFiID0gcG9ydC5uYW1lO1xuICAgIG5hbWUgPSAnZGV2dG9vbHMnO1xuICAgIGluc3RhbGxDb250ZW50U2NyaXB0KCtwb3J0Lm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHRhYiA9IHBvcnQuc2VuZGVyLnRhYi5pZDtcbiAgICBuYW1lID0gJ2NvbnRlbnQtc2NyaXB0JztcbiAgfVxuICBsb2coJ3RhYicsIHRhYik7XG4gIGxvZygnbmFtZScsIG5hbWUpO1xuXG4gIGlmICghcG9ydHNbdGFiXSkge1xuICAgIGxvZygnYWRkaW5nIHBvcnQgZm9yIHRhYicsIHRhYik7XG4gICAgcG9ydHNbdGFiXSA9IHtcbiAgICAgIGRldnRvb2xzOiBudWxsLFxuICAgICAgJ2NvbnRlbnQtc2NyaXB0JzogbnVsbCxcbiAgICB9O1xuICB9XG4gIHBvcnRzW3RhYl1bbmFtZV0gPSBwb3J0O1xuXG4gIGlmIChwb3J0c1t0YWJdLmRldnRvb2xzICYmIHBvcnRzW3RhYl1bJ2NvbnRlbnQtc2NyaXB0J10pIHtcbiAgICBkb3VibGVQaXBlKHBvcnRzW3RhYl0uZGV2dG9vbHMsIHBvcnRzW3RhYl1bJ2NvbnRlbnQtc2NyaXB0J10pO1xuICB9XG59KTtcblxuZnVuY3Rpb24gaXNOdW1lcmljKHN0cikge1xuICByZXR1cm4gK3N0ciArICcnID09PSBzdHI7XG59XG5cbmZ1bmN0aW9uIGluc3RhbGxDb250ZW50U2NyaXB0KHRhYklkKSB7XG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHsgZmlsZTogJ2NvbnRlbnQuanMnIH0sIGZ1bmN0aW9uKCkge30pO1xufVxuXG5mdW5jdGlvbiBkb3VibGVQaXBlKG9uZSwgdHdvKSB7XG4gIGxvZygnc2V0dGluZyB1cCBkb3VibGUgcGlwZScpO1xuICBvbmUub25NZXNzYWdlLmFkZExpc3RlbmVyKGxPbmUpO1xuICBmdW5jdGlvbiBsT25lKG1lc3NhZ2UpIHtcbiAgICBsb2coJ2RldnRvb2xzIC0+IGNvbnRlbnQtc2NyaXB0JywgbWVzc2FnZSk7XG4gICAgdHdvLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG4gIHR3by5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobFR3byk7XG4gIGZ1bmN0aW9uIGxUd28obWVzc2FnZSkge1xuICAgIGxvZygnY29udGVudC1zY3JpcHQgLT4gZGV2dG9vbHMnLCBtZXNzYWdlKTtcbiAgICBvbmUucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cbiAgZnVuY3Rpb24gc2h1dGRvd24oKSB7XG4gICAgbG9nKCdkb3VibGUgcGlwZSBzaHV0ZG93bicpO1xuICAgIG9uZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobE9uZSk7XG4gICAgdHdvLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihsVHdvKTtcbiAgICBvbmUuZGlzY29ubmVjdCgpO1xuICAgIHR3by5kaXNjb25uZWN0KCk7XG4gIH1cbiAgb25lLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcihzaHV0ZG93bik7XG4gIHR3by5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoc2h1dGRvd24pO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZywgc2VuZGVyKSA9PiB7XG4gIGxvZygnbWVzc2FnZSBmcm9tIHJ1bnRpbWUnLCBtc2cpO1xuICBpZiAobXNnLmZhbGNvckRldGVjdGVkICYmIHNlbmRlci50YWIpIHtcbiAgICBsb2coJ2RldGVjdGVkIGZhbGNvciBpbiB0YWInLCBzZW5kZXIudGFiLmlkKTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHRhYklkOiBzZW5kZXIudGFiLmlkLFxuICAgICAgcGF0aDoge1xuICAgICAgICAnMzInOiAnaWNvbi1lbmFibGVkLnBuZycsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldFBvcHVwKHtcbiAgICAgIHRhYklkOiBzZW5kZXIudGFiLmlkLFxuICAgICAgcG9wdXA6ICdwb3B1cC1lbmFibGVkLmh0bWwnLFxuICAgIH0pO1xuICB9XG59KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2JhY2tncm91bmQuanNcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);