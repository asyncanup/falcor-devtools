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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('hook');\n\nfunction installGlobalHook(window) {\n  var log = console.log.bind(console);\n\n  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {\n    log('hook already installed');\n    return;\n  }\n\n  log('initializing hook');\n  var hook = {\n    model: null,\n    setModel: function setModel(model) {\n      window.postMessage({\n        source: 'falcor-detector'\n      }, '*');\n      hook.model = model;\n    }\n  };\n  window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__ = hook;\n}\n\nvar lastDetectionResult;\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {\n    log('falcor detected');\n    lastDetectionResult = {\n      falcorDetected: true\n    };\n    chrome.runtime.sendMessage(lastDetectionResult);\n  }\n});\nwindow.addEventListener('pageshow', function (evt) {\n  if (!lastDetectionResult || evt.target !== window.document) {\n    return;\n  }\n  log('sending last detection of falcor');\n  chrome.runtime.sendMessage(lastDetectionResult);\n});\n\nvar js = ';(' + installGlobalHook.toString() + '(window))';\n\n// This script runs before the <head> element is created, so we add the script\n// to <html> instead.\nvar script = document.createElement('script');\nscript.textContent = js;\ndocument.documentElement.appendChild(script);\nscript.parentNode.removeChild(script);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaG9vay5qcz85ZTMxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sb2coJ2hvb2snKTtcblxuZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEhvb2sod2luZG93KSB7XG4gIHZhciBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuXG4gIGlmICh3aW5kb3cuX19GQUxDT1JfREVWVE9PTFNfR0xPQkFMX0hPT0tfXykge1xuICAgIGxvZygnaG9vayBhbHJlYWR5IGluc3RhbGxlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZygnaW5pdGlhbGl6aW5nIGhvb2snKTtcbiAgY29uc3QgaG9vayA9ICh7XG4gICAgbW9kZWw6IG51bGwsXG4gICAgc2V0TW9kZWw6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBzb3VyY2U6ICdmYWxjb3ItZGV0ZWN0b3InLFxuICAgICAgfSwgJyonKTtcbiAgICAgIGhvb2subW9kZWwgPSBtb2RlbDtcbiAgICB9LFxuICB9KTtcbiAgd2luZG93Ll9fRkFMQ09SX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPSBob29rO1xufVxuXG52YXIgbGFzdERldGVjdGlvblJlc3VsdDtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmIChldnQuc291cmNlID09PSB3aW5kb3cgJiYgZXZ0LmRhdGEgJiYgZXZ0LmRhdGEuc291cmNlID09PSAnZmFsY29yLWRldGVjdG9yJykge1xuICAgIGxvZygnZmFsY29yIGRldGVjdGVkJyk7XG4gICAgbGFzdERldGVjdGlvblJlc3VsdCA9IHtcbiAgICAgIGZhbGNvckRldGVjdGVkOiB0cnVlLFxuICAgIH07XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobGFzdERldGVjdGlvblJlc3VsdCk7XG4gIH1cbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmICghbGFzdERldGVjdGlvblJlc3VsdCB8fCBldnQudGFyZ2V0ICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nKCdzZW5kaW5nIGxhc3QgZGV0ZWN0aW9uIG9mIGZhbGNvcicpO1xuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShsYXN0RGV0ZWN0aW9uUmVzdWx0KTtcbn0pO1xuXG52YXIganMgPSAnOygnICsgaW5zdGFsbEdsb2JhbEhvb2sudG9TdHJpbmcoKSArICcod2luZG93KSknO1xuXG4vLyBUaGlzIHNjcmlwdCBydW5zIGJlZm9yZSB0aGUgPGhlYWQ+IGVsZW1lbnQgaXMgY3JlYXRlZCwgc28gd2UgYWRkIHRoZSBzY3JpcHRcbi8vIHRvIDxodG1sPiBpbnN0ZWFkLlxudmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuc2NyaXB0LnRleHRDb250ZW50ID0ganM7XG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9ob29rLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);