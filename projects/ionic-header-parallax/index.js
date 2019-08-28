var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Renderer, ElementRef, Input } from '@angular/core';
var ParallaxDirective = /** @class */ (function () {
    function ParallaxDirective(headerRef, renderer) {
        this.headerRef = headerRef;
        this.renderer = renderer;
        this.backgroundImageUrl = '';
        this.expandedColor = '#ab26c3';
        this.fadeTitle = false;
        this.headerMaxHeight = 200;
    }
    ParallaxDirective.prototype.ngOnInit = function () {
        var _this = this;
        var parentElement = this.headerRef.nativeElement.parentElement;
        this.header = this.headerRef.nativeElement;
        this.toolbar = this.headerRef.nativeElement.getElementsByClassName('toolbar')[0];
        if (!this.toolbar)
            throw 'Parallax directive requires a toolbar or navbar element on the page to work.';
        this.ionTitle = this.toolbar.getElementsByClassName('title')[0];
        this.toolbarBackground = this.headerRef.nativeElement.getElementsByClassName('toolbar-background')[0];
        this.toolbarBackground.innerHTML = "<div style=\"width:100%; height:100%\" class=\"overlay\"></div>";
        this.toolbarBackgroundOverlay = this.toolbarBackground.getElementsByClassName('overlay')[0];
        this.barButtons = Array.from(this.headerRef.nativeElement.getElementsByClassName('bar-buttons'));
        var backButton = this.headerRef.nativeElement.getElementsByClassName('back-button')[0];
        if (backButton)
            this.barButtons.push(backButton);
        this.fixedContent = parentElement.getElementsByClassName('fixed-content')[0];
        this.scrollContent = parentElement.getElementsByClassName('scroll-content')[0];
        if (!this.scrollContent)
            throw 'Parallax directive requires a <ion-content> element on the page to work.';
        this.headerHeight = this.scrollContent.clientHeight;
        this.ticking = false;
        window.addEventListener('resize', function () {
            _this.headerHeight = _this.scrollContent.clientHeight;
        }, false);
        if (this.scrollContent)
            this.scrollContent.addEventListener('scroll', function () {
                if (!_this.ticking) {
                    window.requestAnimationFrame(function () {
                        _this.updateElasticHeader();
                    });
                }
                _this.ticking = true;
            });
    };
    ParallaxDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.scrollContent || !toolbar)
            return;
        // fetch styles
        this.headerMaxHeight = parseFloat(this.headerMaxHeight.toString());
        this.headerMinHeight = this.toolbar.offsetHeight;
        var scrollContentPaddingTop = window.getComputedStyle(this.scrollContent, null).paddingTop.replace('px', '');
        scrollContentPaddingTop = parseFloat(scrollContentPaddingTop);
        this.originalToolbarBgColor = window.getComputedStyle(this.toolbarBackground, null).backgroundColor;
        // .header
        this.renderer.setElementStyle(this.header, 'height', this.headerMaxHeight + "px");
        // .toolbar .title
        if (this.fadeTitle)
            this.renderer.setElementStyle(this.ionTitle, 'opacity', '0');
        // .toolbar-background .overlay
        this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'background-color', this.expandedColor);
        this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'background-image', "url(" + (this.backgroundImageUrl || '') + ")");
        // .toolbar-background
        this.renderer.setElementStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);
        // .bar-buttons
        this.barButtons.forEach(function (element) {
            _this.renderer.setElementStyle(element, 'bottom', _this.toolbar.offsetHeight / 2 - _this.headerMinHeight / 2 + "px");
        });
        // .fixed-content
        if (this.fixedContent)
            this.renderer.setElementAttribute(this.fixedContent, 'parallax', 'true');
        // .scroll-content
        if (this.scrollContent) {
            this.renderer.setElementAttribute(this.scrollContent, 'parallax', 'true');
            this.renderer.setElementStyle(this.scrollContent, 'padding-top', this.headerMaxHeight + scrollContentPaddingTop + "px");
        }
    };
    ParallaxDirective.prototype.updateElasticHeader = function () {
        var _this = this;
        if (!this.scrollContent || !toolbar)
            return;
        this.scrollTop = this.scrollContent.scrollTop;
        if (this.scrollTop >= 0) {
            this.translateAmt = this.scrollTop / 2;
            this.scaleAmt = 1;
        }
        else {
            this.translateAmt = 0;
            this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
        }
        // Parallax progress
        var progress = (this.headerMaxHeight - this.scrollTop - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight);
        progress = Math.max(progress, 0);
        // header
        var targetHeight = this.headerMaxHeight - this.scrollTop;
        targetHeight = Math.max(targetHeight, this.headerMinHeight);
        this.renderer.setElementStyle(this.header, 'height', targetHeight + "px");
        // .toolbar .title
        if (this.fadeTitle)
            this.renderer.setElementStyle(this.ionTitle, 'opacity', "" + (1 - progress));
        // .toolbar-background
        this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'opacity', "" + progress);
        this.renderer.setElementStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);
        // .bar-buttons
        this.barButtons.forEach(function (element) {
            var h = element.offsetHeight;
            _this.renderer.setElementStyle(element, 'bottom', _this.toolbar.offsetHeight / 2 - _this.headerMinHeight / 2 + "px");
        });
        this.ticking = false;
    };
    __decorate([
        Input('imageUrl'),
        __metadata("design:type", String)
    ], ParallaxDirective.prototype, "backgroundImageUrl", void 0);
    __decorate([
        Input('parallaxColor'),
        __metadata("design:type", String)
    ], ParallaxDirective.prototype, "expandedColor", void 0);
    __decorate([
        Input('fadeTitle'),
        __metadata("design:type", Boolean)
    ], ParallaxDirective.prototype, "fadeTitle", void 0);
    __decorate([
        Input('maximumHeight'),
        __metadata("design:type", Number)
    ], ParallaxDirective.prototype, "headerMaxHeight", void 0);
    ParallaxDirective = __decorate([
        Directive({
            selector: 'ion-header[parallax]',
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], ParallaxDirective);
    return ParallaxDirective;
}());
export { ParallaxDirective };
//# sourceMappingURL=parallax.js.map