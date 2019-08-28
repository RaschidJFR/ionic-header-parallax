(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/@ionic/core/dist/esm-es5/ion-img.entry.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/ion-img.entry.js ***!
  \****************************************************************/
/*! exports provided: ion_img */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_img", function() { return Img; });
/* harmony import */ var _core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-13ed1ad7.js */ "./node_modules/@ionic/core/dist/esm-es5/core-13ed1ad7.js");
/* harmony import */ var _config_bb99b659_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-bb99b659.js */ "./node_modules/@ionic/core/dist/esm-es5/config-bb99b659.js");


var Img = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.onLoad = function () {
            _this.ionImgDidLoad.emit();
        };
        this.onError = function () {
            _this.ionError.emit();
        };
        this.ionImgWillLoad = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionImgWillLoad", 7);
        this.ionImgDidLoad = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionImgDidLoad", 7);
        this.ionError = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionError", 7);
    }
    class_1.prototype.srcChanged = function () {
        this.addIO();
    };
    class_1.prototype.componentDidLoad = function () {
        this.addIO();
    };
    class_1.prototype.addIO = function () {
        var _this = this;
        if (this.src === undefined) {
            return;
        }
        if ('IntersectionObserver' in window) {
            this.removeIO();
            this.io = new IntersectionObserver(function (data) {
                // because there will only ever be one instance
                // of the element we are observing
                // we can just use data[0]
                if (data[0].isIntersecting) {
                    _this.load();
                    _this.removeIO();
                }
            });
            this.io.observe(this.el);
        }
        else {
            // fall back to setTimeout for Safari and IE
            setTimeout(function () { return _this.load(); }, 200);
        }
    };
    class_1.prototype.load = function () {
        this.loadError = this.onError;
        this.loadSrc = this.src;
        this.ionImgWillLoad.emit();
    };
    class_1.prototype.removeIO = function () {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    };
    class_1.prototype.render = function () {
        return (Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["H"], { class: Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this) }, Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { decoding: "async", src: this.loadSrc, alt: this.alt, onLoad: this.onLoad, onError: this.loadError })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "src": ["srcChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host{-o-object-fit:contain;object-fit:contain}:host,img{display:block}img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());



/***/ })

}]);
//# sourceMappingURL=28-es5.js.map