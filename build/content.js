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

	eval("'use strict';\n\n/* global chrome */\n\nvar log = console.log.bind(console);\n\nvar globalHookFn = '\\nfunction installGlobalHook(window) {\\n  var clog = console.log.bind(console);\\n\\n  if (window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__) {\\n    clog(\\'hook already installed\\');\\n    return;\\n  }\\n\\n  const hook = ({\\n    model: null,\\n    capturing: false,\\n    setModel: function(model) {\\n      window.postMessage({\\n        source: \\'falcor-detector\\',\\n      }, \\'*\\');\\n      hook.model = model;\\n      model._root.onChange = function() {\\n        clog(\\'model updated\\', hook.capturing);\\n        if (hook.capturing) {\\n          var cache = model.getCache();\\n          window.postMessage({\\n            source: \\'falcor-model-updated\\',\\n            payload: {\\n              // cache,\\n              cacheSize: JSON.stringify(cache).length,\\n            }\\n          }, \\'*\\');\\n          window.postMessage({\\n            source: \\'falcor-model-updated\\',\\n            payload: {\\n              nodeCounts: hook.getNodeCounts(cache),\\n            }\\n          }, \\'*\\');\\n        }\\n      };\\n    },\\n    getNodeCounts: function(cache) {\\n      const nodeCounts = {};\\n      Object.keys(cache).forEach((key, i) => {\\n        nodeCounts[key] = hook.getCounts(cache[key]);\\n      });\\n      return nodeCounts;\\n    },\\n    getCounts: function(obj) {\\n      if (typeof obj !== \\'object\\') {\\n        return 1;\\n      }\\n      if (obj.$type) {\\n        return 1;\\n      }\\n      return Object.keys(obj).reduce((sum, key) => sum + hook.getCounts(obj[key]), 0);\\n    }\\n  });\\n  window.__FALCOR_DEVTOOLS_GLOBAL_HOOK__ = hook;\\n}\\n';\n\nvar lastDetectionResult;\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-detector') {\n    log('falcor detected');\n    lastDetectionResult = {\n      falcorDetected: true\n    };\n    chrome.runtime.sendMessage(lastDetectionResult);\n  }\n});\nwindow.addEventListener('pageshow', function (evt) {\n  if (!lastDetectionResult || evt.target !== window.document) {\n    return;\n  }\n  log('sending last detection of falcor');\n  chrome.runtime.sendMessage(lastDetectionResult);\n});\nwindow.addEventListener('message', function (evt) {\n  if (evt.source === window && evt.data && evt.data.source === 'falcor-model-updated') {\n    chrome.runtime.sendMessage({\n      // falcorModelupdated: evt.data.payload.cache,\n      cacheSize: evt.data.payload.cacheSize,\n      nodeCounts: evt.data.payload.nodeCounts\n    });\n  }\n});\n\nvar js = ';(' + globalHookFn + '(window))';\n\n// This script runs before the <head> element is created, so we add the script\n// to <html> instead.\nvar script = document.createElement('script');\nscript.textContent = js;\ndocument.documentElement.appendChild(script);\nscript.parentNode.removeChild(script);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29udGVudC5qcz85NWZmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIGNocm9tZSAqL1xudmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5cbmNvbnN0IGdsb2JhbEhvb2tGbiA9IGBcbmZ1bmN0aW9uIGluc3RhbGxHbG9iYWxIb29rKHdpbmRvdykge1xuICB2YXIgY2xvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG5cbiAgaWYgKHdpbmRvdy5fX0ZBTENPUl9ERVZUT09MU19HTE9CQUxfSE9PS19fKSB7XG4gICAgY2xvZygnaG9vayBhbHJlYWR5IGluc3RhbGxlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhvb2sgPSAoe1xuICAgIG1vZGVsOiBudWxsLFxuICAgIGNhcHR1cmluZzogZmFsc2UsXG4gICAgc2V0TW9kZWw6IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBzb3VyY2U6ICdmYWxjb3ItZGV0ZWN0b3InLFxuICAgICAgfSwgJyonKTtcbiAgICAgIGhvb2subW9kZWwgPSBtb2RlbDtcbiAgICAgIG1vZGVsLl9yb290Lm9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb2coJ21vZGVsIHVwZGF0ZWQnLCBob29rLmNhcHR1cmluZyk7XG4gICAgICAgIGlmIChob29rLmNhcHR1cmluZykge1xuICAgICAgICAgIHZhciBjYWNoZSA9IG1vZGVsLmdldENhY2hlKCk7XG4gICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHNvdXJjZTogJ2ZhbGNvci1tb2RlbC11cGRhdGVkJyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgLy8gY2FjaGUsXG4gICAgICAgICAgICAgIGNhY2hlU2l6ZTogSlNPTi5zdHJpbmdpZnkoY2FjaGUpLmxlbmd0aCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBzb3VyY2U6ICdmYWxjb3ItbW9kZWwtdXBkYXRlZCcsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIG5vZGVDb3VudHM6IGhvb2suZ2V0Tm9kZUNvdW50cyhjYWNoZSksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgJyonKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgIGdldE5vZGVDb3VudHM6IGZ1bmN0aW9uKGNhY2hlKSB7XG4gICAgICBjb25zdCBub2RlQ291bnRzID0ge307XG4gICAgICBPYmplY3Qua2V5cyhjYWNoZSkuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgICAgIG5vZGVDb3VudHNba2V5XSA9IGhvb2suZ2V0Q291bnRzKGNhY2hlW2tleV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm9kZUNvdW50cztcbiAgICB9LFxuICAgIGdldENvdW50czogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBpZiAob2JqLiR0eXBlKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChzdW0sIGtleSkgPT4gc3VtICsgaG9vay5nZXRDb3VudHMob2JqW2tleV0pLCAwKTtcbiAgICB9XG4gIH0pO1xuICB3aW5kb3cuX19GQUxDT1JfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyA9IGhvb2s7XG59XG5gO1xuXG52YXIgbGFzdERldGVjdGlvblJlc3VsdDtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmIChldnQuc291cmNlID09PSB3aW5kb3cgJiYgZXZ0LmRhdGEgJiYgZXZ0LmRhdGEuc291cmNlID09PSAnZmFsY29yLWRldGVjdG9yJykge1xuICAgIGxvZygnZmFsY29yIGRldGVjdGVkJyk7XG4gICAgbGFzdERldGVjdGlvblJlc3VsdCA9IHtcbiAgICAgIGZhbGNvckRldGVjdGVkOiB0cnVlLFxuICAgIH07XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobGFzdERldGVjdGlvblJlc3VsdCk7XG4gIH1cbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24oZXZ0KSB7XG4gIGlmICghbGFzdERldGVjdGlvblJlc3VsdCB8fCBldnQudGFyZ2V0ICE9PSB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nKCdzZW5kaW5nIGxhc3QgZGV0ZWN0aW9uIG9mIGZhbGNvcicpO1xuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShsYXN0RGV0ZWN0aW9uUmVzdWx0KTtcbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldnQpIHtcbiAgaWYgKGV2dC5zb3VyY2UgPT09IHdpbmRvdyAmJlxuICAgICAgZXZ0LmRhdGEgJiZcbiAgICAgIGV2dC5kYXRhLnNvdXJjZSA9PT0gJ2ZhbGNvci1tb2RlbC11cGRhdGVkJykge1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgIC8vIGZhbGNvck1vZGVsdXBkYXRlZDogZXZ0LmRhdGEucGF5bG9hZC5jYWNoZSxcbiAgICAgIGNhY2hlU2l6ZTogZXZ0LmRhdGEucGF5bG9hZC5jYWNoZVNpemUsXG4gICAgICBub2RlQ291bnRzOiBldnQuZGF0YS5wYXlsb2FkLm5vZGVDb3VudHMsXG4gICAgfSk7XG4gIH1cbn0pO1xuXG52YXIganMgPSAnOygnICsgZ2xvYmFsSG9va0ZuICsgJyh3aW5kb3cpKSc7XG5cbi8vIFRoaXMgc2NyaXB0IHJ1bnMgYmVmb3JlIHRoZSA8aGVhZD4gZWxlbWVudCBpcyBjcmVhdGVkLCBzbyB3ZSBhZGQgdGhlIHNjcmlwdFxuLy8gdG8gPGh0bWw+IGluc3RlYWQuXG52YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5zY3JpcHQudGV4dENvbnRlbnQgPSBqcztcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbnRlbnQuanNcbiAqKi8iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUF5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);