(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./dist/ionic-header-parallax/fesm5/ionic-header-parallax.js":
/*!*******************************************************************!*\
  !*** ./dist/ionic-header-parallax/fesm5/ionic-header-parallax.js ***!
  \*******************************************************************/
/*! exports provided: IonicHeaderParallaxModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonicHeaderParallaxModule", function() { return IonicHeaderParallaxModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return ParallaxDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ParallaxDirective = /** @class */ (function () {
    function ParallaxDirective(headerRef, renderer) {
        this.headerRef = headerRef;
        this.renderer = renderer;
        this.maximumHeight = 300;
    }
    /**
     * @return {?}
     */
    ParallaxDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.initElements();
            _this.initStyles();
            _this.initEvents();
        }));
    };
    /**
     * @return {?}
     */
    ParallaxDirective.prototype.initElements = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var parentElement = this.headerRef.nativeElement.parentElement;
        this.header = this.headerRef.nativeElement;
        this.toolbar = this.header.querySelector('ion-toolbar');
        if (!this.toolbar) {
            throw new Error('Parallax directive requires a toolbar or navbar element on the page to work.');
        }
        this.ionTitle = this.toolbar.querySelector('ion-title');
        this.toolbarBackground = this.toolbar.shadowRoot.querySelector('.toolbar-background');
        this.barButtons = this.headerRef.nativeElement.querySelector('ion-buttons');
        /** @type {?} */
        var ionContent = parentElement.querySelector('ion-content');
        this.scrollContent = ionContent.shadowRoot.querySelector('.inner-scroll');
        if (!this.scrollContent) {
            throw new Error('Parallax directive requires an <ion-content> element on the page to work.');
        }
        // Create image overlay
        this.imageOverlay = this.renderer.createElement('div');
        this.renderer.addClass(this.imageOverlay, 'image-overlay');
        this.colorOverlay = this.renderer.createElement('div');
        this.renderer.addClass(this.colorOverlay, 'color-overlay');
        this.colorOverlay.appendChild(this.imageOverlay);
        this.header.appendChild(this.colorOverlay);
        // Copy title and buttons
        this.overlayTitle = this.ionTitle && (/** @type {?} */ (this.ionTitle.cloneNode(true)));
        if (this.overlayTitle) {
            this.renderer.addClass(this.overlayTitle, 'parallax-title');
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var toolbarTitle = _this.overlayTitle.shadowRoot.querySelector('.toolbar-title');
                _this.renderer.setStyle(toolbarTitle, 'pointer-events', 'unset');
            }));
        }
        if (this.overlayTitle) {
            this.imageOverlay.appendChild(this.overlayTitle);
        }
        if (this.barButtons) {
            this.imageOverlay.appendChild(this.barButtons);
        }
    };
    /**
     * @return {?}
     */
    ParallaxDirective.prototype.initStyles = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.headerHeight = this.scrollContent.clientHeight;
        this.ticking = false;
        if (!this.scrollContent || !toolbar) {
            return;
        }
        // fetch styles
        this.maximumHeight = parseFloat(this.maximumHeight.toString());
        this.headerMinHeight = this.toolbar.offsetHeight;
        this.scrollContentPaddingTop = window.getComputedStyle(this.scrollContent, null).paddingTop.replace('px', '');
        this.scrollContentPaddingTop = parseFloat(this.scrollContentPaddingTop);
        this.originalToolbarBgColor = window.getComputedStyle(this.toolbarBackground, null).backgroundColor;
        // header and title
        this.renderer.setStyle(this.header, 'position', 'relative');
        if (this.overlayTitle) {
            this.renderer.setStyle(this.overlayTitle, 'color', this.titleColor);
            this.renderer.setStyle(this.overlayTitle, 'position', 'absolute');
            this.renderer.setStyle(this.overlayTitle, 'width', '100%');
            this.renderer.setStyle(this.overlayTitle, 'height', '100%');
            this.renderer.setStyle(this.overlayTitle, 'text-align', 'center');
        }
        // color overlay
        this.renderer.setStyle(this.colorOverlay, 'background-color', this.originalToolbarBgColor);
        this.renderer.setStyle(this.colorOverlay, 'height', this.maximumHeight + "px");
        this.renderer.setStyle(this.colorOverlay, 'position', 'absolute');
        this.renderer.setStyle(this.colorOverlay, 'top', -this.headerMinHeight * 0 + "px");
        this.renderer.setStyle(this.colorOverlay, 'left', '0');
        this.renderer.setStyle(this.colorOverlay, 'width', '100%');
        this.renderer.setStyle(this.colorOverlay, 'z-index', '10');
        this.renderer.setStyle(this.colorOverlay, 'pointer-events', 'none');
        // image overlay
        this.renderer.setStyle(this.imageOverlay, 'background-color', this.expandedColor);
        this.renderer.setStyle(this.imageOverlay, 'background-image', "url(" + (this.imageUrl || '') + ")");
        this.renderer.setStyle(this.imageOverlay, 'height', "100%");
        this.renderer.setStyle(this.imageOverlay, 'width', '100%');
        this.renderer.setStyle(this.imageOverlay, 'pointer-events', 'none');
        this.renderer.setStyle(this.imageOverlay, 'background-size', 'cover');
        this.renderer.setStyle(this.imageOverlay, 'background-position', 'center');
        // .toolbar-background
        this.renderer.setStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);
        // .bar-buttons
        if (this.barButtons) {
            this.renderer.setStyle(this.barButtons, 'pointer-events', 'all');
            Array.from(this.barButtons.children).forEach((/**
             * @param {?} btn
             * @return {?}
             */
            function (btn) {
                _this.renderer.setStyle(btn, 'color', _this.titleColor);
            }));
        }
        // .scroll-content
        if (this.scrollContent) {
            this.renderer.setAttribute(this.scrollContent, 'parallax', '');
            this.renderer.setStyle(this.scrollContent, 'padding-top', this.maximumHeight + this.scrollContentPaddingTop - this.headerMinHeight + "px");
        }
    };
    /**
     * @return {?}
     */
    ParallaxDirective.prototype.initEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        window.addEventListener('resize', (/**
         * @return {?}
         */
        function () {
            _this.headerHeight = _this.scrollContent.clientHeight;
        }), false);
        if (this.scrollContent) {
            this.scrollContent.addEventListener('scroll', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (!_this.ticking) {
                    window.requestAnimationFrame((/**
                     * @return {?}
                     */
                    function () {
                        _this.updateElasticHeader();
                    }));
                }
                _this.ticking = true;
            }));
        }
    };
    /**
     * @return {?}
     */
    ParallaxDirective.prototype.updateElasticHeader = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.scrollContent || !toolbar) {
            return;
        }
        this.scrollTop = this.scrollContent.scrollTop;
        if (this.scrollTop >= 0) {
            this.translateAmt = this.scrollTop / 2;
            this.scaleAmt = 1;
        }
        else {
            this.translateAmt = 0;
            this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
        }
        // Parallax total progress
        this.headerMinHeight = this.toolbar.offsetHeight;
        /** @type {?} */
        var progress = (this.maximumHeight - this.scrollTop - this.headerMinHeight) / (this.maximumHeight - this.headerMinHeight);
        progress = Math.max(progress, 0);
        // ion-header: set height
        /** @type {?} */
        var targetHeight = this.maximumHeight - this.scrollTop;
        targetHeight = Math.max(targetHeight, this.headerMinHeight);
        // .toolbar-background: change color
        this.renderer.setStyle(this.imageOverlay, 'height', targetHeight + "px");
        this.renderer.setStyle(this.imageOverlay, 'opacity', "" + progress);
        this.renderer.setStyle(this.colorOverlay, 'height', targetHeight + "px");
        this.renderer.setStyle(this.colorOverlay, 'opacity', targetHeight > this.headerMinHeight ? '1' : '0');
        this.renderer.setStyle(this.toolbarBackground, 'background-color', targetHeight > this.headerMinHeight ? 'transparent' : this.originalToolbarBgColor);
        // .bar-buttons
        if (this.barButtons) {
            if (targetHeight > this.headerMinHeight) {
                this.imageOverlay.append(this.barButtons);
                Array.from(this.barButtons.children).forEach((/**
                 * @param {?} btn
                 * @return {?}
                 */
                function (btn) {
                    _this.renderer.setStyle(btn, 'color', _this.titleColor);
                }));
            }
            else {
                this.toolbar.append(this.barButtons);
                Array.from(this.barButtons.children).forEach((/**
                 * @param {?} btn
                 * @return {?}
                 */
                function (btn) {
                    _this.renderer.setStyle(btn, 'color', 'unset');
                }));
            }
        }
        this.ticking = false;
    };
    ParallaxDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: 'ion-header[parallax]'
                },] }
    ];
    /** @nocollapse */
    ParallaxDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    ParallaxDirective.propDecorators = {
        imageUrl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        expandedColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        titleColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        maximumHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
    };
    return ParallaxDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IonicHeaderParallaxModule = /** @class */ (function () {
    function IonicHeaderParallaxModule() {
    }
    IonicHeaderParallaxModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        ParallaxDirective
                    ],
                    imports: [],
                    exports: [
                        ParallaxDirective
                    ]
                },] }
    ];
    return IonicHeaderParallaxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ionic-header-parallax.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header parallax imageUrl=\"https://picsum.photos/1080\" maximumHeight=\"350\" expandedColor=\"#AAA\" titleColor=\"#313131\">\n\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n      Parallax Header\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <p>This directive enables parallax effect on <code>ion-header</code> elements to display a cover photo while on top of\n    the page and transition it to the normal navbar when content is scrolled down.</p>\n  <h2 id=\"set-up\">Set Up</h2>\n  <ol>\n    <li>Install package: <code>$ npm i ionic-header-parallax</code>.</li>\n    <li>Import the directive into your desired module (usually <code>app.module.ts</code>):</li>\n  </ol>\n  <pre class=\"hljs\"><code><div><span class=\"hljs-keyword\">import</span>  IonicHeaderParallaxModule  <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'ionic-header-parallax'</span>;\n\n<span class=\"hljs-meta\">@NgModule</span>(\n  imports: [\n    IonicHeaderParallaxModule,\n    ...\n</div></code></pre>\n  <h2 id=\"usage\">Usage</h2>\n  <p>Just add the attribute <code>parallax</code> to any <code>&lt;ion-header&gt;</code> element:</p>\n  <pre class=\"hljs\"><code><div><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ion-header</span> <span class=\"hljs-attr\">parallax</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ion-header</span>&gt;</span>\n</div></code></pre>\n  <p>Optional attributes:</p>\n  <ul>\n    <li><code>imageUrl (string)</code>: The background image to show while expanded.</li>\n    <li><code>maximumHeight (number)</code>: The height for the header when expanded. Default is <code>200</code>.</li>\n    <li><code>expandedColor (string)</code>: The color (web hex formatted) to show while the header is expanded when no\n      <code>imageUrl</code> is set. When scrolled it will fade to the navbar/toolbar's color or the one configured in\n      <code>&lt;toolbar color=&quot;&quot;&gt;</code> attribute.</li>\n    <li><code>titleColor (string)</code>: The text color (web hex formatted) for <code>&lt;ion-title&gt;</code> and\n      <code>&lt;ion-back-button&gt;</code> elements when expanded. They will turn to their default color on cover\n      collapse.</li>\n  </ul>\n  <p>Example:</p>\n  <pre class=\"hljs\"><code><div><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ion-header</span> <span class=\"hljs-attr\">parallax</span> <span class=\"hljs-attr\">imageUrl</span>=<span class=\"hljs-string\">\"https://picsum.photos/350\"</span> <span class=\"hljs-attr\">maximumHeight</span>=<span class=\"hljs-string\">\"350\"</span> <span class=\"hljs-attr\">expandedColor</span>=<span class=\"hljs-string\">\"#AAA\"</span> <span class=\"hljs-attr\">titleColor</span>=<span class=\"hljs-string\">\"black\"</span>&gt;</span>\n\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ion-toolbar</span> <span class=\"hljs-attr\">color</span>=<span class=\"hljs-string\">\"primary\"</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ion-title</span>&gt;</span>\n      Parallax Header\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ion-title</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ion-toolbar</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ion-header</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ion-content</span>&gt;</span>\n\tSome content here\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ion-content</span>&gt;</span>\n</div></code></pre>\n  <h2 id=\"modifying-the-source-code\">Modifying the Source Code</h2>\n  <p>In case you need to make your own modifications, the package is pretty simple, just 1 .ts file. You can clone the\n    repo wherever in your ionic project (usually inside the <code>directives</code> folder):\n    <code>$ git clone https://github.com/RaschidJFR/ionic-header-parallax.git</code>. Then edit the file\n    <code>src/lib/parallax.directive.ts</code>.</p>\n  <h2 id=\"contributing\">Contributing</h2>\n  <p>I don't plan to be full-time maintaining this package, but as I'm usually developing in Ionic I'll be glad to\n    update it any time I make some upgrades for myself.\n    Contributions are very welcome. The source files can be found in the <a\n      href=\"https://github.com/RaschidGithub/ionic-header-parallax\">repo</a>.</p>\n  <h2 id=\"credits\">Credits</h2>\n  <p>Raschid JF. Rafaelly</p>\n  <p><a href=\"mailto:me@raschidjfr.dev\">me@raschidjfr.dev</a></p>\n  <p><a href=\"https://raschidjfr.dev\">https://raschidjfr.dev</a></p>\n  <p>This is an implementation of this awesome tutorial on v2 by <a\n      href=\"https://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/\">Josh Morony</a>. Thanks.\n  </p>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var ionic_header_parallax__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic-header-parallax */ "./dist/ionic-header-parallax/fesm5/ionic-header-parallax.js");








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ]),
                ionic_header_parallax__WEBPACK_IMPORTED_MODULE_7__["IonicHeaderParallaxModule"]
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n  --ion-color-primary: #5f468c;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcVXNlcnNcXFJhc2NoaWRcXEdpdFxcQ29yZG92YVxcaW9uaWMtdG9vbGJveFxcZGlyZWN0aXZlc1xcaW9uaWMtaGVhZGVyLXBhcmFsbGF4L3NyY1xcYXBwXFxob21lXFxob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICM1ZjQ2OGM7XG59IiwiKiB7XG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICM1ZjQ2OGM7XG59Il19 */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HomePage = /** @class */ (function () {
    function HomePage() {
    }
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map