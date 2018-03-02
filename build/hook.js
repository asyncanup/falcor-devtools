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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('hook');\n\nfunction installGlobalHook(window) {\n  var log = console.log.bind(console);\n\n  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {\n    log('hook already installed');\n    return;\n  }\n\n  log('initializing hook');\n  var hook = {\n    _models: {},\n    helpers: {},\n    inject: function inject(model) {\n      var id = Math.random().toString(16).slice(2);\n      hook._models[id] = model;\n      hook.emit('model', { id: id, model: model });\n      return id;\n    },\n    _listeners: {},\n    sub: function sub(evt, fn) {\n      hook.on(evt, fn);\n      return function () {\n        return hook.off(evt, fn);\n      };\n    },\n    on: function on(evt, fn) {\n      if (!hook._listeners[evt]) {\n        hook._listeners[evt] = [];\n      }\n      hook._listeners[evt].push(fn);\n    },\n    off: function off(evt, fn) {\n      if (!hook._listeners[evt]) {\n        return;\n      }\n      var ix = hook._listeners[evt].indexOf(fn);\n      if (ix !== -1) {\n        hook._listeners[evt].splice(ix, 1);\n      }\n      if (!hook._listeners[evt].length) {\n        hook._listeners[evt] = null;\n      }\n    },\n    emit: function emit(evt, data) {\n      if (hook._listeners[evt]) {\n        hook._listeners[evt].map(function (fn) {\n          return fn(data);\n        });\n      }\n    }\n  };\n  Object.defineProperty(window, '__FALCOR_DEVTOOLS_GLOBAL_HOOK__', { value: hook });\n}\n\nvar lastDetectionResult;\n\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {\n    log('falcor detected');\n    lastDetectionResult = {\n      falcorDetected: true\n    };\n    chrome.runtime.sendMessage(lastDetectionResult);\n  }\n});\n\n// NOTE: Firefox WebExtensions content scripts are still alive and not re-injected\n// while navigating the history to a document that has not been destroyed yet,\n// replay the last detection result if the content script is active and the\n// document has been hidden and shown again.\nwindow.addEventListener('pageshow', function (evt) {\n  if (!lastDetectionResult || evt.target !== window.document) {\n    return;\n  }\n  log('sending last detection of falcor');\n  chrome.runtime.sendMessage(lastDetectionResult);\n});\n\nvar detectFalcor = '\\nwindow.__FALCOR_DEVTOOLS_GLOBAL_HOOK__.on(\\'model\\', function(evt) {\\n  log(\\'falcor model emitted\\');\\n  window.postMessage({\\n    source: \\'falcor-detector\\',\\n  }, \\'*\\');\\n});\\n';\n\nvar js = ';(' + installGlobalHook.toString() + '(window))' + ';' + detectFalcor;\n\n// This script runs before the <head> element is created, so we add the script\n// to <html> instead.\nvar script = document.createElement('script');\nscript.textContent = js;\ndocument.documentElement.appendChild(script);\nscript.parentNode.removeChild(script);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvaG9vay5qcz85ZTMxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sb2coJ2hvb2snKTtcblxuZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEhvb2sod2luZG93KSB7XG4gIHZhciBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuXG4gIGlmICh3aW5kb3cuX19GQUxDT1JfREVWVE9PTFNfR0xPQkFMX0hPT0tfXykge1xuICAgIGxvZygnaG9vayBhbHJlYWR5IGluc3RhbGxlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZygnaW5pdGlhbGl6aW5nIGhvb2snKTtcbiAgY29uc3QgaG9vayA9ICh7XG4gICAgX21vZGVsczoge30sXG4gICAgaGVscGVyczoge30sXG4gICAgaW5qZWN0OiBmdW5jdGlvbihtb2RlbCkge1xuICAgICAgdmFyIGlkID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMik7XG4gICAgICBob29rLl9tb2RlbHNbaWRdID0gbW9kZWw7XG4gICAgICBob29rLmVtaXQoJ21vZGVsJywge2lkLCBtb2RlbH0pO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH0sXG4gICAgX2xpc3RlbmVyczoge30sXG4gICAgc3ViOiBmdW5jdGlvbihldnQsIGZuKSB7XG4gICAgICBob29rLm9uKGV2dCwgZm4pO1xuICAgICAgcmV0dXJuICgpID0+IGhvb2sub2ZmKGV2dCwgZm4pO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uKGV2dCwgZm4pIHtcbiAgICAgIGlmICghaG9vay5fbGlzdGVuZXJzW2V2dF0pIHtcbiAgICAgICAgaG9vay5fbGlzdGVuZXJzW2V2dF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIGhvb2suX2xpc3RlbmVyc1tldnRdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgb2ZmOiBmdW5jdGlvbihldnQsIGZuKSB7XG4gICAgICBpZiAoIWhvb2suX2xpc3RlbmVyc1tldnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBpeCA9IGhvb2suX2xpc3RlbmVyc1tldnRdLmluZGV4T2YoZm4pO1xuICAgICAgaWYgKGl4ICE9PSAtMSkge1xuICAgICAgICBob29rLl9saXN0ZW5lcnNbZXZ0XS5zcGxpY2UoaXgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKCFob29rLl9saXN0ZW5lcnNbZXZ0XS5sZW5ndGgpIHtcbiAgICAgICAgaG9vay5fbGlzdGVuZXJzW2V2dF0gPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW1pdDogZnVuY3Rpb24oZXZ0LCBkYXRhKSB7XG4gICAgICBpZiAoaG9vay5fbGlzdGVuZXJzW2V2dF0pIHtcbiAgICAgICAgaG9vay5fbGlzdGVuZXJzW2V2dF0ubWFwKGZuID0+IGZuKGRhdGEpKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgJ19fRkFMQ09SX0RFVlRPT0xTX0dMT0JBTF9IT09LX18nLCB7IHZhbHVlOiBob29rIH0pO1xufVxuXG52YXIgbGFzdERldGVjdGlvblJlc3VsdDtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldnQpIHtcbiAgaWYgKGV2dC5zb3VyY2UgPT09IHdpbmRvdyAmJiBldnQuZGF0YSAmJiBldnQuZGF0YS5zb3VyY2UgPT09ICdmYWxjb3ItZGV0ZWN0b3InKSB7XG4gICAgbG9nKCdmYWxjb3IgZGV0ZWN0ZWQnKTtcbiAgICBsYXN0RGV0ZWN0aW9uUmVzdWx0ID0ge1xuICAgICAgZmFsY29yRGV0ZWN0ZWQ6IHRydWUsXG4gICAgfTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShsYXN0RGV0ZWN0aW9uUmVzdWx0KTtcbiAgfVxufSk7XG5cbi8vIE5PVEU6IEZpcmVmb3ggV2ViRXh0ZW5zaW9ucyBjb250ZW50IHNjcmlwdHMgYXJlIHN0aWxsIGFsaXZlIGFuZCBub3QgcmUtaW5qZWN0ZWRcbi8vIHdoaWxlIG5hdmlnYXRpbmcgdGhlIGhpc3RvcnkgdG8gYSBkb2N1bWVudCB0aGF0IGhhcyBub3QgYmVlbiBkZXN0cm95ZWQgeWV0LFxuLy8gcmVwbGF5IHRoZSBsYXN0IGRldGVjdGlvbiByZXN1bHQgaWYgdGhlIGNvbnRlbnQgc2NyaXB0IGlzIGFjdGl2ZSBhbmQgdGhlXG4vLyBkb2N1bWVudCBoYXMgYmVlbiBoaWRkZW4gYW5kIHNob3duIGFnYWluLlxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmICghbGFzdERldGVjdGlvblJlc3VsdCB8fCBldnQudGFyZ2V0ICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nKCdzZW5kaW5nIGxhc3QgZGV0ZWN0aW9uIG9mIGZhbGNvcicpO1xuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShsYXN0RGV0ZWN0aW9uUmVzdWx0KTtcbn0pO1xuXG52YXIgZGV0ZWN0RmFsY29yID0gYFxud2luZG93Ll9fRkFMQ09SX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ub24oJ21vZGVsJywgZnVuY3Rpb24oZXZ0KSB7XG4gIGxvZygnZmFsY29yIG1vZGVsIGVtaXR0ZWQnKTtcbiAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICBzb3VyY2U6ICdmYWxjb3ItZGV0ZWN0b3InLFxuICB9LCAnKicpO1xufSk7XG5gO1xuXG52YXIganMgPSAoXG4gICc7KCcgKyBpbnN0YWxsR2xvYmFsSG9vay50b1N0cmluZygpICsgJyh3aW5kb3cpKScgK1xuICAnOycgKyBkZXRlY3RGYWxjb3Jcbik7XG5cbi8vIFRoaXMgc2NyaXB0IHJ1bnMgYmVmb3JlIHRoZSA8aGVhZD4gZWxlbWVudCBpcyBjcmVhdGVkLCBzbyB3ZSBhZGQgdGhlIHNjcmlwdFxuLy8gdG8gPGh0bWw+IGluc3RlYWQuXG52YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5zY3JpcHQudGV4dENvbnRlbnQgPSBqcztcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2hvb2suanNcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXBDQTtBQXNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);