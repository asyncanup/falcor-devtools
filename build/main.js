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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('main');\n\nvar panelCreated = false;\n\nfunction createPanelIfFalcorLoaded() {\n  if (panelCreated) {\n    log('panel already created');\n    return;\n  }\n  chrome.devtools.inspectedWindow.eval('!!(\\n    Object.keys(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__._models).length ||\\n    window.Falcor ||\\n    (window.require && require(\\'falcor\\'))\\n  )', function (falcorDetected, err) {\n    if (!falcorDetected || panelCreated) {\n      log('no falcor detected');\n      return;\n    }\n\n    log('falcor detected');\n    clearInterval(loadCheckInterval);\n    panelCreated = true;\n    chrome.devtools.panels.create('Falcor', '', 'panel.html', function (panel) {\n      log('panel created');\n      var falcorPanel = null;\n      panel.onShown.addListener(function (window) {\n        falcorPanel = window.panel;\n        log('panel showing', falcorPanel);\n        // falcorPanel.resumeTransfer();\n      });\n      panel.onHidden.addListener(function () {\n        if (falcorPanel) {\n          log('panel hiding');\n          // falcorPanel.hideHighlight();\n          // falcorPanel.pauseTransfer();\n        }\n      });\n    });\n  });\n}\n\nchrome.devtools.network.onNavigated.addListener(function () {\n  log('network.onNavigated');\n  createPanelIfFalcorLoaded();\n});\n\n// Check to see if Falcor has loaded once per second in case Falcor is added\n// after page load\nvar loadCheckInterval = setInterval(function () {\n  createPanelIfFalcorLoaded();\n}, 1000);\n\ncreatePanelIfFalcorLoaded();\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvbWFpbi5qcz8xYzkwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sb2coJ21haW4nKTtcblxudmFyIHBhbmVsQ3JlYXRlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBjcmVhdGVQYW5lbElmRmFsY29yTG9hZGVkKCkge1xuICBpZiAocGFuZWxDcmVhdGVkKSB7XG4gICAgbG9nKCdwYW5lbCBhbHJlYWR5IGNyZWF0ZWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKGAhIShcbiAgICBPYmplY3Qua2V5cyh3aW5kb3cuX19GQUxDT1JfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5fbW9kZWxzKS5sZW5ndGggfHxcbiAgICB3aW5kb3cuRmFsY29yIHx8XG4gICAgKHdpbmRvdy5yZXF1aXJlICYmIHJlcXVpcmUoJ2ZhbGNvcicpKVxuICApYCwgZnVuY3Rpb24oZmFsY29yRGV0ZWN0ZWQsIGVycikge1xuICAgIGlmICghZmFsY29yRGV0ZWN0ZWQgfHwgcGFuZWxDcmVhdGVkKSB7XG4gICAgICBsb2coJ25vIGZhbGNvciBkZXRlY3RlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZygnZmFsY29yIGRldGVjdGVkJyk7XG4gICAgY2xlYXJJbnRlcnZhbChsb2FkQ2hlY2tJbnRlcnZhbCk7XG4gICAgcGFuZWxDcmVhdGVkID0gdHJ1ZTtcbiAgICBjaHJvbWUuZGV2dG9vbHMucGFuZWxzLmNyZWF0ZSgnRmFsY29yJywgJycsICdwYW5lbC5odG1sJywgZnVuY3Rpb24ocGFuZWwpIHtcbiAgICAgIGxvZygncGFuZWwgY3JlYXRlZCcpO1xuICAgICAgdmFyIGZhbGNvclBhbmVsID0gbnVsbDtcbiAgICAgIHBhbmVsLm9uU2hvd24uYWRkTGlzdGVuZXIoZnVuY3Rpb24od2luZG93KSB7XG4gICAgICAgIGZhbGNvclBhbmVsID0gd2luZG93LnBhbmVsO1xuICAgICAgICBsb2coJ3BhbmVsIHNob3dpbmcnLCBmYWxjb3JQYW5lbCk7XG4gICAgICAgIC8vIGZhbGNvclBhbmVsLnJlc3VtZVRyYW5zZmVyKCk7XG4gICAgICB9KTtcbiAgICAgIHBhbmVsLm9uSGlkZGVuLmFkZExpc3RlbmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZmFsY29yUGFuZWwpIHtcbiAgICAgICAgICBsb2coJ3BhbmVsIGhpZGluZycpO1xuICAgICAgICAgIC8vIGZhbGNvclBhbmVsLmhpZGVIaWdobGlnaHQoKTtcbiAgICAgICAgICAvLyBmYWxjb3JQYW5lbC5wYXVzZVRyYW5zZmVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY2hyb21lLmRldnRvb2xzLm5ldHdvcmsub25OYXZpZ2F0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24oKSB7XG4gIGxvZygnbmV0d29yay5vbk5hdmlnYXRlZCcpO1xuICBjcmVhdGVQYW5lbElmRmFsY29yTG9hZGVkKCk7XG59KTtcblxuLy8gQ2hlY2sgdG8gc2VlIGlmIEZhbGNvciBoYXMgbG9hZGVkIG9uY2UgcGVyIHNlY29uZCBpbiBjYXNlIEZhbGNvciBpcyBhZGRlZFxuLy8gYWZ0ZXIgcGFnZSBsb2FkXG52YXIgbG9hZENoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgY3JlYXRlUGFuZWxJZkZhbGNvckxvYWRlZCgpO1xufSwgMTAwMCk7XG5cbmNyZWF0ZVBhbmVsSWZGYWxjb3JMb2FkZWQoKTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL21haW4uanNcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);