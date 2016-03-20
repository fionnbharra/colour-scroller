(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("colour-scroller", [], factory);
	else if(typeof exports === 'object')
		exports["colour-scroller"] = factory();
	else
		root["colour-scroller"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _scrollBetweenBroadcaster = __webpack_require__(1);
	
	var _scrollBetweenBroadcaster2 = _interopRequireDefault(_scrollBetweenBroadcaster);
	
	var _bgColourSetter = __webpack_require__(2);
	
	var _bgColourSetter2 = _interopRequireDefault(_bgColourSetter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = function ColourScroller(elems /* nodelist */) {
	  _classCallCheck(this, ColourScroller);
	
	  for (var i = 0; i < elems.length; i++) {
	    if (elems[i + 1] === undefined) {
	      break;
	    }
	    // publishes an event to indicate which div.row we have scrolled to
	    new _scrollBetweenBroadcaster2.default(elems[i], elems[i + 1]);
	  }
	  // listens for that event and updates body bg colour
	  new _bgColourSetter2.default();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Takes two divs and publishes an event on scroll.
	 * The event is an object containg both divs, an active indicator and the percentage scorlled between both divs
	 * @constructor
	 * @param {element} startDiv - first div
	 * @param {element} endDiv - second div
	 */
	module.exports = function () {
	  function ScrollBetweenBroadcaster(startDiv, endDiv) {
	    var _this = this;
	
	    _classCallCheck(this, ScrollBetweenBroadcaster);
	
	    this.startDiv = startDiv;
	    this.endDiv = endDiv;
	    var distance = this.endDiv.offsetTop - this.startDiv.offsetTop;
	    var startOffset = this.startDiv.offsetTop;
	    window.addEventListener('scroll', function (ev) {
	      return _this.scrollHandler(ev, startOffset, distance);
	    });
	  }
	
	  _createClass(ScrollBetweenBroadcaster, [{
	    key: 'broadCast',
	    value: function broadCast(percentageThrough) {
	      var active = false;
	      if (percentageThrough > 0 && percentageThrough < 100) {
	        active = true;
	      }
	
	      var event = new CustomEvent('activeDivs', {
	        'detail': {
	          percentageThrough: percentageThrough,
	          active: active,
	          'startDiv': this.startDiv,
	          'endDiv': this.endDiv
	        }
	      });
	      window.dispatchEvent(event);
	    }
	  }, {
	    key: 'scrollHandler',
	    value: function scrollHandler(ev, startOffset, distance) {
	      var scrollPos = ev.currentTarget.scrollY;
	      var percentageThrough = this.calcPercentageThrough(scrollPos, startOffset, distance);
	      this.broadCast(percentageThrough);
	    }
	  }, {
	    key: 'calcPercentageThrough',
	    value: function calcPercentageThrough(scrollPos, offset, distance) {
	      var amountThrough = ((scrollPos - offset) / distance).toFixed(2) * 100;
	      if (amountThrough <= 0) {
	        return 0;
	      }
	      if (amountThrough >= 100) {
	        return 100;
	      }
	      return amountThrough;
	    }
	  }]);
	
	  return ScrollBetweenBroadcaster;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = function () {
	  function BgColourSetter() {
	    var _this = this;
	
	    _classCallCheck(this, BgColourSetter);
	
	    window.addEventListener('activeDivs', function (ev) {
	      return _this.animateDivs(ev.detail);
	    });
	  }
	
	  _createClass(BgColourSetter, [{
	    key: 'getRGB',
	    value: function getRGB(startElem, endElem, percentageThrough) {
	      return {
	        red: this.getNewRange(startElem, endElem, percentageThrough, 'red'),
	        green: this.getNewRange(startElem, endElem, percentageThrough, 'green'),
	        blue: this.getNewRange(startElem, endElem, percentageThrough, 'blue')
	      };
	    }
	  }, {
	    key: 'getNewRange',
	    value: function getNewRange(startElem, endElem, percentageThrough, key) {
	      var newMin = Number(startElem.dataset[key]),
	          newMax = Number(endElem.dataset[key]),
	          oldValue = percentageThrough;
	
	      var newRange = newMax - newMin;
	      var newValue = Math.round(oldValue * newRange / 100 + newMin);
	
	      return newValue;
	    }
	  }, {
	    key: 'animateDivs',
	    value: function animateDivs(details) {
	      if (!details.active) {
	        return;
	      }
	      var colour = this.getRGB(details.startDiv, details.endDiv, details.percentageThrough);
	      document.body.style.backgroundColor = 'rgb(' + colour.red + ', ' + colour.green + ', ' + colour.blue + ')';
	    }
	  }]);
	
	  return BgColourSetter;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=colour-scroller.js.map