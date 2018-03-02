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

	eval("'use strict';\n\nconsole.log('backend');\n\nwindow.addEventListener('message', welcome);\nfunction welcome(evt) {\n  if (evt.source !== window || evt.data.source !== 'falcor-devtools-content-script') {\n    return;\n  }\n\n  window.removeEventListener('message', welcome);\n  setup(window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__);\n}\n\nfunction setup(hook) {\n  var listeners = [];\n\n  var wall = {\n    listen: function listen(fn) {\n      var listener = function listener(evt) {\n        if (evt.source !== window || !evt.data || evt.data.source !== 'falcor-devtools-content-script' || !evt.data.payload) {\n          return;\n        }\n        fn(evt.data.payload);\n      };\n      listeners.push(listener);\n      window.addEventListener('message', listener);\n    },\n    send: function send(data) {\n      window.postMessage({\n        source: 'falcor-devtools-bridge',\n        payload: data\n      }, '*');\n    }\n  };\n}\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYmFja2VuZC5qcz82YmZlIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc29sZS5sb2coJ2JhY2tlbmQnKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB3ZWxjb21lKTtcbmZ1bmN0aW9uIHdlbGNvbWUoZXZ0KSB7XG4gIGlmIChldnQuc291cmNlICE9PSB3aW5kb3cgfHwgZXZ0LmRhdGEuc291cmNlICE9PSAnZmFsY29yLWRldnRvb2xzLWNvbnRlbnQtc2NyaXB0Jykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgd2VsY29tZSk7XG4gIHNldHVwKHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fKTtcbn1cblxuZnVuY3Rpb24gc2V0dXAoaG9vaykge1xuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgdmFyIHdhbGwgPSB7XG4gICAgbGlzdGVuKGZuKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICBpZiAoZXZ0LnNvdXJjZSAhPT0gd2luZG93IHx8ICFldnQuZGF0YSB8fCBldnQuZGF0YS5zb3VyY2UgIT09ICdmYWxjb3ItZGV2dG9vbHMtY29udGVudC1zY3JpcHQnIHx8ICFldnQuZGF0YS5wYXlsb2FkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZuKGV2dC5kYXRhLnBheWxvYWQpO1xuICAgICAgfTtcbiAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIpO1xuICAgIH0sXG4gICAgc2VuZChkYXRhKSB7XG4gICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBzb3VyY2U6ICdmYWxjb3ItZGV2dG9vbHMtYnJpZGdlJyxcbiAgICAgICAgcGF5bG9hZDogZGF0YSxcbiAgICAgIH0sICcqJyk7XG4gICAgfSxcbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9iYWNrZW5kLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQWhCQTtBQWtCQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);