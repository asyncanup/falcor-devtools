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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('devtools');\n\nvar panelCreated = false;\n\nfunction createPanelIfFalcorLoaded() {\n  if (panelCreated) {\n    log('panel already created');\n    return;\n  }\n  chrome.devtools.inspectedWindow.eval('!!(\\n    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length ||\\n    window.falcor ||\\n    (window.require && require(\\'falcor\\'))\\n  )', function (falcorDetected, err) {\n    if (!falcorDetected || panelCreated) {\n      log('no falcor detected');\n      return;\n    }\n\n    log('falcor detected');\n    clearInterval(loadCheckInterval);\n    panelCreated = true;\n    chrome.devtools.panels.create('Falcor', '', 'panel.html', function (panel) {\n      log('panel created');\n      panel.onShown.addListener(function (window) {\n        log('panel showing');\n      });\n      panel.onHidden.addListener(function () {\n        log('panel hiding');\n      });\n    });\n  });\n}\n\nchrome.devtools.network.onNavigated.addListener(function () {\n  log('network.onNavigated');\n  createPanelIfFalcorLoaded();\n});\n\n// Check to see if Falcor has loaded once per second in case Falcor is added\n// after page load\nvar loadCheckInterval = setInterval(function () {\n  createPanelIfFalcorLoaded();\n}, 1000);\n\ncreatePanelIfFalcorLoaded();\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvZGV2dG9vbHMuanM/YzkxNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBjaHJvbWUgKi9cbnZhciBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xubG9nKCdkZXZ0b29scycpO1xuXG52YXIgcGFuZWxDcmVhdGVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhbmVsSWZGYWxjb3JMb2FkZWQoKSB7XG4gIGlmIChwYW5lbENyZWF0ZWQpIHtcbiAgICBsb2coJ3BhbmVsIGFscmVhZHkgY3JlYXRlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LmV2YWwoYCEhKFxuICAgIE9iamVjdC5rZXlzKHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fLl9tb2RlbHMpLmxlbmd0aCB8fFxuICAgIHdpbmRvdy5mYWxjb3IgfHxcbiAgICAod2luZG93LnJlcXVpcmUgJiYgcmVxdWlyZSgnZmFsY29yJykpXG4gIClgLCBmdW5jdGlvbihmYWxjb3JEZXRlY3RlZCwgZXJyKSB7XG4gICAgaWYgKCFmYWxjb3JEZXRlY3RlZCB8fCBwYW5lbENyZWF0ZWQpIHtcbiAgICAgIGxvZygnbm8gZmFsY29yIGRldGVjdGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nKCdmYWxjb3IgZGV0ZWN0ZWQnKTtcbiAgICBjbGVhckludGVydmFsKGxvYWRDaGVja0ludGVydmFsKTtcbiAgICBwYW5lbENyZWF0ZWQgPSB0cnVlO1xuICAgIGNocm9tZS5kZXZ0b29scy5wYW5lbHMuY3JlYXRlKCdGYWxjb3InLCAnJywgJ3BhbmVsLmh0bWwnLCBmdW5jdGlvbihwYW5lbCkge1xuICAgICAgbG9nKCdwYW5lbCBjcmVhdGVkJyk7XG4gICAgICBwYW5lbC5vblNob3duLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHdpbmRvdykge1xuICAgICAgICBsb2coJ3BhbmVsIHNob3dpbmcnKTtcbiAgICAgIH0pO1xuICAgICAgcGFuZWwub25IaWRkZW4uYWRkTGlzdGVuZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvZygncGFuZWwgaGlkaW5nJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNocm9tZS5kZXZ0b29scy5uZXR3b3JrLm9uTmF2aWdhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKCkge1xuICBsb2coJ25ldHdvcmsub25OYXZpZ2F0ZWQnKTtcbiAgY3JlYXRlUGFuZWxJZkZhbGNvckxvYWRlZCgpO1xufSk7XG5cbi8vIENoZWNrIHRvIHNlZSBpZiBGYWxjb3IgaGFzIGxvYWRlZCBvbmNlIHBlciBzZWNvbmQgaW4gY2FzZSBGYWxjb3IgaXMgYWRkZWRcbi8vIGFmdGVyIHBhZ2UgbG9hZFxudmFyIGxvYWRDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIGNyZWF0ZVBhbmVsSWZGYWxjb3JMb2FkZWQoKTtcbn0sIDEwMDApO1xuXG5jcmVhdGVQYW5lbElmRmFsY29yTG9hZGVkKCk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9kZXZ0b29scy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);