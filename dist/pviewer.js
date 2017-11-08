(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pviewer", [], factory);
	else if(typeof exports === 'object')
		exports["pviewer"] = factory();
	else
		root["pviewer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(3)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(5),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-pviewer',
    props: {
        list: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        value: {
            type: Boolean,
            default: false
        },
        complete: {
            type: Boolean,
            default: true
        },
        selector: {
            type: String,
            default: 'img'
        }
    },
    data: function data() {
        return {
            imgList: [],
            show: false,
            boxWidth: 0,
            sliderMargin: 30,
            opacity: 1,
            count: 0,
            activeIndex: 0,
            activeImg: false,
            activeNode: false,
            startPosition: {
                x: 0,
                y: 0
            },
            position: {
                x: 0,
                y: 0
            },
            startZoomPosition: {
                x: 0,
                y: 0
            },
            zoomPosition: {
                x: 0,
                y: 0
            },
            zoomSize: 1,
            startDire: false,
            moving: false,
            zoom: false,
            step: 50
        };
    },

    methods: {
        tstart: function tstart(evt) {
            if (!evt.touches) return;

            var now = Date.now();
            this.tap = true;
            this.x1 = evt.touches[0].clientX;
            this.y1 = evt.touches[0].clientY;
            this.startDire = false;
            if (this.zoom === false) {
                this.startPosition.x = this.position.x;
                this.startPosition.y = this.position.y;
            } else {
                this.startZoomPosition.x = this.zoomPosition.x;
                this.startZoomPosition.y = this.zoomPosition.y;
                if (this.overflow === true) {
                    this.overflowed = true;
                }
            }
        },
        tmove: function tmove(evt) {
            if (!evt.touches) return;
            this.x2 = evt.touches[0].clientX;
            this.y2 = evt.touches[0].clientY;
            var xd = this.x2 - this.x1;
            var yd = this.y2 - this.y1;
            var absYd = Math.abs(yd);
            if (Math.abs(xd) > 5 || absYd > 5) {
                this.tap = false;
            } else {
                return;
            }

            if (this.zoom === false || this.overflowed === true) {
                if (this.count <= 1) {
                    return;
                }
                if (this.startDire === false) {
                    this.startDire = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                }
                if (this.zoom === false && (this.startDire === 'Up' || this.startDire === 'Down')) {
                    this.opacity = 1 - absYd / 300;
                    this.$refs.box.style.opacity = this.opacity;

                    this.position.y = this.startPosition.y + yd;
                    if (this.activeNode === false) {
                        this.activeNode = evt.target;
                    }
                    this._tranform(this.activeNode, { x: 0, y: this.position.y });
                } else {
                    this.position.x = this.startPosition.x + xd;
                    this.$refs.list.style.transition = '';
                    this.moveWrap();
                }
            } else {
                var px = this.startZoomPosition.x + xd;
                var py = this.startZoomPosition.y + yd;
                if (px > this.zoomMaxWidth.left) {
                    px = this.zoomMaxWidth.left;
                    this.overflow = true;
                } else if (px < this.zoomMaxWidth.right) {
                    px = this.zoomMaxWidth.right;
                    this.overflow = true;
                } else {
                    this.reSetOverflow();
                }

                this.zoomPosition.x = px;
                this.zoomPosition.y = py;
                this._tranform(this.activeImg, { x: px, y: py }, { x: this.zoomSize, y: this.zoomSize });
            }
        },
        tend: function tend(evt) {
            var _this = this;

            if (!evt.changedTouches) return;
            if (this.opacity !== 1) {
                if (this.opacity < 0.65) {
                    this.hide();
                    setTimeout(function () {
                        _this.reSetActiveNode();
                    }, 400);
                } else {
                    this.reSetActiveNode();
                }
            }
            if (this.show === false) {
                return;
            }
            var now = Date.now();
            var speed = now - this.now;
            if (this.tap === true && this.moving === false && now - this.lastEndNow < 300 && evt.target.className === 'v-pviewer-img') {
                this.activeImg = evt.target;
                this.zoomImg(evt.changedTouches[0]);
            } else if (this.tap === false && (this.zoom === false || this.overflowed === true)) {
                var moveLen = this.position.x - this.startPosition.x;

                var step = this.step;
                this.$refs.list.style.transition = 'all .3s ease';
                if (speed < 300 && moveLen < 0 || moveLen <= -step) {
                    this.goNext();
                } else if (speed < 300 && moveLen > 0 || moveLen >= step) {
                    this.goPre();
                } else {
                    this.reSetPosition();
                }
            }
            this.lastEndNow = now;
        },
        moveWrap: function moveWrap(isTmove) {
            if (this.position.x > 0) {
                this.startPosition.x = 0;
            } else if (this.position.x < -this.maxPosition) {
                this.position.x = -this.maxPosition;
            } else {
                this.moving = true;
                this._tranform(this.$refs.list, { x: this.position.x, y: 0 });
                if (isTmove) return;
                this.moving = false;
            }
        },
        goNext: function goNext() {
            if (this.activeIndex < this.count - 1) {
                this.activeIndex++;
                this.position.x = this.boxWidth * this.activeIndex * -1;
            }
            var activeImgData = this.imgList[this.activeIndex];
            this._emit('slide-next', activeImgData);
            this.moveWrap();
            this.reSetZoom();
            this._emit('slide-end', activeImgData);
        },
        goPre: function goPre() {
            if (this.activeIndex === 0) {
                this.position.x = 0;
            } else {
                this.activeIndex--;
                this.position.x = this.boxWidth * this.activeIndex * -1;
            }
            var activeImgData = this.imgList[this.activeIndex];
            this._emit('slide-next', activeImgData);
            this.moveWrap();
            this.reSetZoom();
            this._emit('slide-end', activeImgData);
        },
        reSetPosition: function reSetPosition(jump) {
            this.reSetOverflow();
            if (jump === true) {
                this.position.x = this.boxWidth * this.activeIndex * -1;
            } else {
                this.moving = true;
                this.position.x = this.startPosition.x;
            }
            var activeImgData = this.imgList[this.activeIndex];
            this.moveWrap();
            this._emit('slide-end', activeImgData);
        },
        reSetOverflow: function reSetOverflow() {
            this.overflow = false;
            this.overflowed = false;
        },
        reSetZoom: function reSetZoom() {
            var _this2 = this;

            this.reSetOverflow();
            setTimeout(function () {
                if (_this2.zoom === true) {
                    _this2.zoomImg();
                }
            });
        },
        zoomImg: function zoomImg() {
            var img = this.activeImg;
            if (!img) {
                return;
            }
            img.style.transition = 'all .3s ease';
            this.overflow = false;
            if (this.zoom === false) {
                var clientRect = img.getBoundingClientRect();
                var boxWidth = this.boxWidth - this.sliderMargin;
                var width = clientRect.width;
                var height = clientRect.height;
                var rate = boxWidth / width;
                var _rate = parseInt(rate + 3);
                var cx = parseInt((this.x1 - clientRect.left) / width * 100);
                var _cx = rate > 1 ? 50 : cx;
                var cy = parseInt((this.y1 - clientRect.top) / clientRect.height * 100);
                var zoomMaxWidth = width * _rate - boxWidth;
                var leftMaxWidth = zoomMaxWidth * (_cx / 100);

                this.zoomSize = _rate;
                this.zoomMaxWidth = {
                    left: leftMaxWidth,
                    right: -(zoomMaxWidth - leftMaxWidth)
                };

                img.style.transformOrigin = _cx + '%' + cy + '% 0';
                this._tranform(img, false, { x: _rate, y: _rate });
                this.zoom = true;
            } else {
                img.style.transform = '';
                img.style.transformOrigin = '';
                this.zoom = false;
                this.zoomSize = 1;
                this.zoomPosition.x = this.startZoomPosition.x = 0;
                this.zoomPosition.y = this.startZoomPosition.y = 0;
                this.activeImg = false;
            }
            setTimeout(function () {
                img.style.transition = '';
            }, 300);
        },
        clicked: function clicked(evt) {
            var className = evt.target.className;
            if (className.indexOf('v-pviewer-zoom') !== -1) {
                this.show = false;
            }
        },
        hide: function hide() {
            this.show = false;
            this.zoom = false;
            this.overflow = false;
            this.moving = false;
        },
        reSetActiveNode: function reSetActiveNode() {
            this.$refs.box.style.opacity = this.opacity = 1;
            if (this.activeNode !== false) {
                this.activeNode.style.transform = '';
                this.activeNode = false;
            }
            if (this.zoom === false) {
                this.position.y = this.startPosition.y = 0;
            }
        },
        startCollectImg: function startCollectImg() {
            var _this3 = this;

            if (this.complete !== true) {
                return;
            }
            this.getListFromImg(function () {
                _this3.show = _this3.value;
                _this3.imgList = _this3.imgList.concat(_this3.list);
                console.log(_this3.imgList, _this3.list);
                _this3.updateList();
            });
        },
        getListFromImg: function getListFromImg(callback) {
            var _this4 = this;

            var container = this.$slots.default[0];

            if (!container) return;
            var selector = this.selector;
            var imgs = container.elm.querySelectorAll(selector);
            var imgArr = [];
            if (!imgs.length) return;
            this.count += imgs.length;
            this.maxPosition = this.boxWidth * (this.count - 1);
            Array.prototype.forEach.call(imgs, function (img, index) {
                var item = {
                    img: img.getAttribute('src'),
                    title: img.getAttribute('title'),
                    desc: img.getAttribute('desc')
                };
                img.setAttribute('v-index', index);
                imgArr.push(item);
                _this4.bindClick(img);
            });
            this.imgList = imgArr;
            if (callback && callback instanceof Function) {
                callback();
            }
        },
        bindClick: function bindClick(img) {
            var _this5 = this;

            img.addEventListener('click', function (e) {
                _this5.activeIndex = e.target.getAttribute('v-index') * 1;
                _this5.reSetPosition(true);
                _this5.show = true;
            });
        },
        _tranform: function _tranform(node, t, s) {
            var T = t || { x: 0, y: 0 };
            var S = s || { x: 1, y: 1 };
            var value = 'matrix(' + S.x + ',0,0,' + S.y + ',' + T.x + ',' + T.y + ')';
            node.style.transform = value;
            node.style.WebkitTransform = value;
        },
        updateList: function updateList() {
            this.count = this.imgList.length;
            this.maxPosition = this.boxWidth * (this.count - 1);
        },

        _swipeDirection: function _swipeDirection(x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
        },
        _emit: function _emit(eventName, data) {
            this.$emit(eventName, { value: data, index: this.activeIndex });
        }
    },
    computed: {
        desc: function desc() {
            var item = this.imgList[this.activeIndex];
            return item ? item.desc : '';
        }
    },
    watch: {
        zoom: function zoom(val) {
            this._emit('zoom', val);
        },
        list: function list(val) {
            this.imgList.push(val[val.length - 1]);
            this.updateList();
        },
        value: function value(val) {
            this.show = val;
        },
        show: function show(val) {
            this.show = val;
            this.$emit('input', val);
        },
        complete: function complete(val) {
            var _this6 = this;

            if (val === true) {
                this.$nextTick(function () {
                    _this6.startCollectImg();
                });
            }
        }
    },
    created: function created() {
        this.position.x = 0;
        this.boxWidth = window.innerWidth + this.sliderMargin;
        this.boxHeight = window.innerHeight;
    },
    mounted: function mounted() {
        this.startCollectImg();
    }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue__);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(__WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue___default.a);
}
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_VPviewer_vue___default.a);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrap",
    staticClass: "v-pviewer-wrap"
  }, [_vm._t("default"), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "v-pviewer"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "box",
    staticClass: "v-pviewer-box",
    on: {
      "touchstart": _vm.tstart,
      "touchmove": function($event) {
        $event.preventDefault();
        _vm.tmove($event)
      },
      "touchend": _vm.tend,
      "click": _vm.clicked
    }
  }, [_vm._t("header", [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.zoom),
      expression: "!zoom"
    }],
    staticClass: "v-pviewer-header",
    on: {
      "click": function($event) {
        _vm.show = false
      }
    }
  }, [_c('span', {
    staticClass: "v-pviewer-index"
  }, [_c('a', [_vm._v(_vm._s(_vm.activeIndex + 1))]), _vm._v("/" + _vm._s(_vm.count))])])]), _vm._v(" "), _c('ul', {
    ref: "list",
    staticClass: "v-pviewer-list"
  }, _vm._l((_vm.imgList), function(item, $index) {
    return _c('li', {
      key: $index,
      staticClass: "v-pviewer-slider",
      style: ({
        'transform': 'translate3d(' + (_vm.boxWidth) * $index + 'px,0,0)'
      })
    }, [_c('div', {
      staticClass: "v-pviewer-zoom"
    }, [_c('img', {
      staticClass: "v-pviewer-img",
      attrs: {
        "src": item.img,
        "alt": item.title
      }
    })])])
  })), _vm._v(" "), _vm._t("footer", [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.desc && !_vm.zoom),
      expression: "desc&&!zoom"
    }],
    staticClass: "v-pviewer-footer"
  }, [_c('p', {
    staticClass: "v-pviewer-desc"
  }, [_vm._v(_vm._s(_vm.desc))])])])], 2)])], 2)
},staticRenderFns: []}

/***/ })
/******/ ]);
});