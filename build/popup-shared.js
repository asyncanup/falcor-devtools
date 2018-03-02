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

	eval("'use strict';\n\n/* globals chrome */\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Make links work\n  var links = document.getElementsByTagName('a');\n  for (var i = 0; i < links.length; i++) {\n    (function () {\n      var ln = links[i];\n      var location = ln.href;\n      ln.onclick = function () {\n        chrome.tabs.create({ active: true, url: location });\n      };\n    })();\n  }\n\n  // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=428044\n  document.body.style.opacity = 0;\n  document.body.style.transition = 'opacity ease-out .4s';\n  requestAnimationFrame(function () {\n    document.body.style.opacity = 1;\n  });\n});\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvcG9wdXAtc2hhcmVkLmpzPzgzZDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyBjaHJvbWUgKi9cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAvLyBNYWtlIGxpbmtzIHdvcmtcbiAgdmFyIGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsbiA9IGxpbmtzW2ldO1xuICAgICAgdmFyIGxvY2F0aW9uID0gbG4uaHJlZjtcbiAgICAgIGxuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHthY3RpdmU6IHRydWUsIHVybDogbG9jYXRpb259KTtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8vIFdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQyODA0NFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLm9wYWNpdHkgPSAwO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSBlYXNlLW91dCAuNHMnO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9wb3B1cC1zaGFyZWQuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);