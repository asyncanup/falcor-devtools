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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\nlog('content');\n\nfunction installGlobalHook(window) {\n  var clog = console.log.bind(console);\n\n  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {\n    clog('hook already installed');\n    return;\n  }\n\n  clog('initializing hook');\n  var hook = {\n    model: null,\n    capturing: false,\n    setModel: function setModel(model) {\n      window.postMessage({\n        source: 'falcor-detector'\n      }, '*');\n      hook.model = model;\n      model._root.onChange = function () {\n        clog('model updated', hook.capturing);\n        if (hook.capturing) {\n          var cache = model.getCache();\n          window.postMessage({\n            source: 'falcor-model-updated',\n            payload: {\n              // cache,\n              cacheSize: JSON.stringify(cache).length\n            }\n          }, '*');\n        }\n      };\n    }\n  };\n  window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__ = hook;\n}\n\nvar lastDetectionResult;\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {\n    log('falcor detected');\n    lastDetectionResult = {\n      falcorDetected: true\n    };\n    chrome.runtime.sendMessage(lastDetectionResult);\n  }\n});\nwindow.addEventListener('pageshow', function (evt) {\n  if (!lastDetectionResult || evt.target !== window.document) {\n    return;\n  }\n  log('sending last detection of falcor');\n  chrome.runtime.sendMessage(lastDetectionResult);\n});\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-model-updated') {\n    chrome.runtime.sendMessage({\n      // falcorModelupdated: evt.data.payload.cache,\n      cacheSize: evt.data.payload.cacheSize\n    });\n  }\n});\n\nvar js = ';(' + installGlobalHook.toString() + '(window))';\n\n// This script runs before the <head> element is created, so we add the script\n// to <html> instead.\nvar script = document.createElement('script');\nscript.textContent = js;\ndocument.documentElement.appendChild(script);\nscript.parentNode.removeChild(script);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29udGVudC5qcz85NWZmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5sb2coJ2NvbnRlbnQnKTtcblxuZnVuY3Rpb24gaW5zdGFsbEdsb2JhbEhvb2sod2luZG93KSB7XG4gIHZhciBjbG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcblxuICBpZiAod2luZG93Ll9fRkFMQ09SX0RFVlRPT0xTX0dMT0JBTF9IT09LX18pIHtcbiAgICBjbG9nKCdob29rIGFscmVhZHkgaW5zdGFsbGVkJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2xvZygnaW5pdGlhbGl6aW5nIGhvb2snKTtcbiAgY29uc3QgaG9vayA9ICh7XG4gICAgbW9kZWw6IG51bGwsXG4gICAgY2FwdHVyaW5nOiBmYWxzZSxcbiAgICBzZXRNb2RlbDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHNvdXJjZTogJ2ZhbGNvci1kZXRlY3RvcicsXG4gICAgICB9LCAnKicpO1xuICAgICAgaG9vay5tb2RlbCA9IG1vZGVsO1xuICAgICAgbW9kZWwuX3Jvb3Qub25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xvZygnbW9kZWwgdXBkYXRlZCcsIGhvb2suY2FwdHVyaW5nKTtcbiAgICAgICAgaWYgKGhvb2suY2FwdHVyaW5nKSB7XG4gICAgICAgICAgdmFyIGNhY2hlID0gbW9kZWwuZ2V0Q2FjaGUoKTtcbiAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgc291cmNlOiAnZmFsY29yLW1vZGVsLXVwZGF0ZWQnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAvLyBjYWNoZSxcbiAgICAgICAgICAgICAgY2FjaGVTaXplOiBKU09OLnN0cmluZ2lmeShjYWNoZSkubGVuZ3RoLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sICcqJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcbiAgfSk7XG4gIHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fID0gaG9vaztcbn1cblxudmFyIGxhc3REZXRlY3Rpb25SZXN1bHQ7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGV2dCkge1xuICBpZiAoZXZ0LnNvdXJjZSA9PT0gd2luZG93ICYmIGV2dC5kYXRhICYmIGV2dC5kYXRhLnNvdXJjZSA9PT0gJ2ZhbGNvci1kZXRlY3RvcicpIHtcbiAgICBsb2coJ2ZhbGNvciBkZXRlY3RlZCcpO1xuICAgIGxhc3REZXRlY3Rpb25SZXN1bHQgPSB7XG4gICAgICBmYWxjb3JEZXRlY3RlZDogdHJ1ZSxcbiAgICB9O1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGxhc3REZXRlY3Rpb25SZXN1bHQpO1xuICB9XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uKGV2dCkge1xuICBpZiAoIWxhc3REZXRlY3Rpb25SZXN1bHQgfHwgZXZ0LnRhcmdldCAhPT0gd2luZG93LmRvY3VtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxvZygnc2VuZGluZyBsYXN0IGRldGVjdGlvbiBvZiBmYWxjb3InKTtcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobGFzdERldGVjdGlvblJlc3VsdCk7XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmIChldnQuc291cmNlID09PSB3aW5kb3cgJiZcbiAgICAgIGV2dC5kYXRhICYmXG4gICAgICBldnQuZGF0YS5zb3VyY2UgPT09ICdmYWxjb3ItbW9kZWwtdXBkYXRlZCcpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAvLyBmYWxjb3JNb2RlbHVwZGF0ZWQ6IGV2dC5kYXRhLnBheWxvYWQuY2FjaGUsXG4gICAgICBjYWNoZVNpemU6IGV2dC5kYXRhLnBheWxvYWQuY2FjaGVTaXplLFxuICAgIH0pO1xuICB9XG59KTtcblxudmFyIGpzID0gJzsoJyArIGluc3RhbGxHbG9iYWxIb29rLnRvU3RyaW5nKCkgKyAnKHdpbmRvdykpJztcblxuLy8gVGhpcyBzY3JpcHQgcnVucyBiZWZvcmUgdGhlIDxoZWFkPiBlbGVtZW50IGlzIGNyZWF0ZWQsIHNvIHdlIGFkZCB0aGUgc2NyaXB0XG4vLyB0byA8aHRtbD4gaW5zdGVhZC5cbnZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbnNjcmlwdC50ZXh0Q29udGVudCA9IGpzO1xuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29udGVudC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQXJCQTtBQXVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);