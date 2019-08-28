(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["status-tap-2758dfd1-js"],{

/***/ "./node_modules/@ionic/core/dist/esm-es5/status-tap-2758dfd1.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/status-tap-2758dfd1.js ***!
  \**********************************************************************/
/*! exports provided: startStatusTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startStatusTap", function() { return startStatusTap; });
/* harmony import */ var _core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-13ed1ad7.js */ "./node_modules/@ionic/core/dist/esm-es5/core-13ed1ad7.js");
/* harmony import */ var _config_bb99b659_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-bb99b659.js */ "./node_modules/@ionic/core/dist/esm-es5/config-bb99b659.js");


var startStatusTap = function () {
    var win = window;
    win.addEventListener('statusTap', function () {
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function () {
            var width = win.innerWidth;
            var height = win.innerHeight;
            var el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            var contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(function () {
                    Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["w"])(function () { return contentEl.scrollToTop(300); });
                });
            }
        });
    });
};



/***/ })

}]);
//# sourceMappingURL=status-tap-2758dfd1-js-es5.js.map