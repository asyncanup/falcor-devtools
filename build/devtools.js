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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('devtools');\n\nvar panelCreated = false;\n\nfunction createPanelIfFalcorLoaded() {\n  if (panelCreated) {\n    log('panel already created');\n    return;\n  }\n  chrome.devtools.inspectedWindow.eval('!!(\\n    window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.model ||\\n    window.falcor ||\\n    (window.require && require(\\'falcor\\'))\\n  )', function (falcorDetected, err) {\n    if (!falcorDetected || panelCreated) {\n      log('no falcor detected');\n      return;\n    }\n\n    log('falcor detected');\n    clearInterval(loadCheckInterval);\n    panelCreated = true;\n    chrome.devtools.panels.create('Falcor', '', 'panel.html', function (panel) {\n      log('panel created');\n      panel.onShown.addListener(function (window) {\n        log('panel showing');\n        chrome.devtools.inspectedWindow.eval('\\n          window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.capturing = true;\\n          JSON.stringify(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.model.getCache()).length\\n        ', function (cacheSize, err) {\n          chrome.runtime.sendMessage({\n            // falcorModelupdated: cache,\n            cacheSize: cacheSize\n          });\n        });\n      });\n      panel.onHidden.addListener(function () {\n        log('panel hiding');\n        chrome.devtools.inspectedWindow.eval('\\n          window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.capturing = false\\n        ');\n      });\n    });\n  });\n}\n\nchrome.devtools.network.onNavigated.addListener(function () {\n  log('network.onNavigated');\n  createPanelIfFalcorLoaded();\n});\n\n// Check to see if Falcor has loaded once per second in case Falcor is added\n// after page load\nvar loadCheckInterval = setInterval(function () {\n  createPanelIfFalcorLoaded();\n}, 1000);\n\ncreatePanelIfFalcorLoaded();\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZGV2dG9vbHMuanM/YzkxNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBjaHJvbWUgKi9cbnZhciBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xubG9nKCdkZXZ0b29scycpO1xuXG52YXIgcGFuZWxDcmVhdGVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhbmVsSWZGYWxjb3JMb2FkZWQoKSB7XG4gIGlmIChwYW5lbENyZWF0ZWQpIHtcbiAgICBsb2coJ3BhbmVsIGFscmVhZHkgY3JlYXRlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoYCEhKFxuICAgIHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fLm1vZGVsIHx8XG4gICAgd2luZG93LmZhbGNvciB8fFxuICAgICh3aW5kb3cucmVxdWlyZSAmJiByZXF1aXJlKCdmYWxjb3InKSlcbiAgKWAsIChmYWxjb3JEZXRlY3RlZCwgZXJyKSA9PiB7XG4gICAgaWYgKCFmYWxjb3JEZXRlY3RlZCB8fCBwYW5lbENyZWF0ZWQpIHtcbiAgICAgIGxvZygnbm8gZmFsY29yIGRldGVjdGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nKCdmYWxjb3IgZGV0ZWN0ZWQnKTtcbiAgICBjbGVhckludGVydmFsKGxvYWRDaGVja0ludGVydmFsKTtcbiAgICBwYW5lbENyZWF0ZWQgPSB0cnVlO1xuICAgIGNocm9tZS5kZXZ0b29scy5wYW5lbHMuY3JlYXRlKCdGYWxjb3InLCAnJywgJ3BhbmVsLmh0bWwnLCAocGFuZWwpID0+IHtcbiAgICAgIGxvZygncGFuZWwgY3JlYXRlZCcpO1xuICAgICAgcGFuZWwub25TaG93bi5hZGRMaXN0ZW5lcigod2luZG93KSA9PiB7XG4gICAgICAgIGxvZygncGFuZWwgc2hvd2luZycpO1xuICAgICAgICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoYFxuICAgICAgICAgIHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fLmNhcHR1cmluZyA9IHRydWU7XG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkod2luZG93Ll9fRkFMQ09SX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ubW9kZWwuZ2V0Q2FjaGUoKSkubGVuZ3RoXG4gICAgICAgIGAsIChjYWNoZVNpemUsIGVycikgPT4ge1xuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIC8vIGZhbGNvck1vZGVsdXBkYXRlZDogY2FjaGUsXG4gICAgICAgICAgICBjYWNoZVNpemVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHBhbmVsLm9uSGlkZGVuLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgbG9nKCdwYW5lbCBoaWRpbmcnKTtcbiAgICAgICAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGBcbiAgICAgICAgICB3aW5kb3cuX19GQUxDT1JfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5jYXB0dXJpbmcgPSBmYWxzZVxuICAgICAgICBgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY2hyb21lLmRldnRvb2xzLm5ldHdvcmsub25OYXZpZ2F0ZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICBsb2coJ25ldHdvcmsub25OYXZpZ2F0ZWQnKTtcbiAgY3JlYXRlUGFuZWxJZkZhbGNvckxvYWRlZCgpO1xufSk7XG5cbi8vIENoZWNrIHRvIHNlZSBpZiBGYWxjb3IgaGFzIGxvYWRlZCBvbmNlIHBlciBzZWNvbmQgaW4gY2FzZSBGYWxjb3IgaXMgYWRkZWRcbi8vIGFmdGVyIHBhZ2UgbG9hZFxudmFyIGxvYWRDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIGNyZWF0ZVBhbmVsSWZGYWxjb3JMb2FkZWQoKTtcbn0sIDEwMDApO1xuXG5jcmVhdGVQYW5lbElmRmFsY29yTG9hZGVkKCk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9kZXZ0b29scy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);