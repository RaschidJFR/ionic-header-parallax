(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["md-transition-1419c53a-js"],{

/***/ "./node_modules/@ionic/core/dist/esm/md.transition-1419c53a.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/md.transition-1419c53a.js ***!
  \*********************************************************************/
/*! exports provided: mdTransitionAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mdTransitionAnimation", function() { return mdTransitionAnimation; });
/* harmony import */ var _animation_5559213c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation-5559213c.js */ "./node_modules/@ionic/core/dist/esm/animation-5559213c.js");


const mdTransitionAnimation = (_, opts) => {
    const OFF_BOTTOM = '40px';
    const CENTER = '0px';
    const backDirection = (opts.direction === 'back');
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    const ionPageElement = getIonPageElement(enteringEl);
    const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
    const rootTransition = Object(_animation_5559213c_js__WEBPACK_IMPORTED_MODULE_0__["c"])();
    rootTransition
        .addElement(ionPageElement)
        .fill('both')
        .beforeRemoveClass('ion-page-invisible');
    // animate the component itself
    if (backDirection) {
        rootTransition
            .duration(opts.duration || 200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)');
    }
    else {
        rootTransition
            .duration(opts.duration || 280)
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .fromTo('transform', `translateY(${OFF_BOTTOM})`, `translateY(${CENTER})`)
            .fromTo('opacity', 0.01, 1);
    }
    // Animate toolbar if it's there
    if (enteringToolbarEle) {
        const enteringToolBar = Object(_animation_5559213c_js__WEBPACK_IMPORTED_MODULE_0__["c"])();
        enteringToolBar.addElement(enteringToolbarEle);
        rootTransition.addAnimation(enteringToolBar);
    }
    // setup leaving view
    if (leavingEl && backDirection) {
        // leaving content
        rootTransition
            .duration(opts.duration || 200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)');
        const leavingPage = Object(_animation_5559213c_js__WEBPACK_IMPORTED_MODULE_0__["c"])();
        leavingPage
            .addElement(getIonPageElement(leavingEl))
            .fromTo('transform', `translateY(${CENTER})`, `translateY(${OFF_BOTTOM})`)
            .fromTo('opacity', 1, 0);
        rootTransition.addAnimation(leavingPage);
    }
    return rootTransition;
};
const getIonPageElement = (element) => {
    if (element.classList.contains('ion-page')) {
        return element;
    }
    const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
    if (ionPage) {
        return ionPage;
    }
    // idk, return the original element so at least something animates and we don't have a null pointer
    return element;
};




/***/ })

}]);
//# sourceMappingURL=md-transition-1419c53a-js-es2015.js.map