(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "./node_modules/@ionic/core/dist/esm/ion-text.entry.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-text.entry.js ***!
  \*************************************************************/
/*! exports provided: ion_text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_text", function() { return Text; });
/* harmony import */ var _core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-13ed1ad7.js */ "./node_modules/@ionic/core/dist/esm/core-13ed1ad7.js");
/* harmony import */ var _config_bb99b659_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-bb99b659.js */ "./node_modules/@ionic/core/dist/esm/config-bb99b659.js");
/* harmony import */ var _theme_353a032e_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme-353a032e.js */ "./node_modules/@ionic/core/dist/esm/theme-353a032e.js");




const Text = class {
    constructor(hostRef) {
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    render() {
        const mode = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this);
        return (Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["H"], { class: Object.assign({}, Object(_theme_353a032e_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color), { [mode]: true }) }, Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    }
    static get style() { return ":host(.ion-color){color:var(--ion-color-base)}"; }
};




/***/ })

}]);
//# sourceMappingURL=70-es2015.js.map