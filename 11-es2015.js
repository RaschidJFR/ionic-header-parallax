(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/@ionic/core/dist/esm/ion-backdrop-ios.entry.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-backdrop-ios.entry.js ***!
  \*********************************************************************/
/*! exports provided: ion_backdrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_backdrop", function() { return Backdrop; });
/* harmony import */ var _core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-13ed1ad7.js */ "./node_modules/@ionic/core/dist/esm/core-13ed1ad7.js");
/* harmony import */ var _config_bb99b659_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-bb99b659.js */ "./node_modules/@ionic/core/dist/esm/config-bb99b659.js");
/* harmony import */ var _index_2c4a5477_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-2c4a5477.js */ "./node_modules/@ionic/core/dist/esm/index-2c4a5477.js");
/* harmony import */ var _helpers_c90aaa66_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers-c90aaa66.js */ "./node_modules/@ionic/core/dist/esm/helpers-c90aaa66.js");





const Backdrop = class {
    constructor(hostRef) {
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.lastClick = -10000;
        this.blocker = _index_2c4a5477_js__WEBPACK_IMPORTED_MODULE_2__["GESTURE_CONTROLLER"].createBlocker({
            disableScroll: true
        });
        /**
         * If `true`, the backdrop will be visible.
         */
        this.visible = true;
        /**
         * If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event.
         */
        this.tappable = true;
        /**
         * If `true`, the backdrop will stop propagation on tap.
         */
        this.stopPropagation = true;
        this.ionBackdropTap = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionBackdropTap", 7);
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = Object(_helpers_c90aaa66_js__WEBPACK_IMPORTED_MODULE_3__["n"])(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < Object(_helpers_c90aaa66_js__WEBPACK_IMPORTED_MODULE_3__["n"])(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    render() {
        const mode = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return (Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["H"], { tabindex: "-1", class: {
                [mode]: true,
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            } }));
    }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"; }
};




/***/ })

}]);
//# sourceMappingURL=11-es2015.js.map