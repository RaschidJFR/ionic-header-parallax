import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'ion-header[parallax]'
})
export class ParallaxDirective implements AfterViewInit {
  @Input() imageUrl: string;
  @Input() expandedColor: string;
  @Input() titleColor: string;
  @Input() maximumHeight = 300;

  header: HTMLElement;
  toolbar: HTMLElement;
  toolbarBackground: HTMLElement;
  imageOverlay: HTMLElement;
  colorOverlay: HTMLElement;
  barButtons: HTMLElement;
  scrollContent: HTMLElement;
  headerHeight: any;
  headerMinHeight: number;
  translateAmt: any;
  scaleAmt: any;
  scrollTop: any;
  lastScrollTop: any;
  ticking: any;
  originalToolbarBgColor: string;
  overlayTitle: HTMLElement;
  ionTitle: HTMLElement;
  overlayButtons: HTMLElement[];
  scrollContentPaddingTop;

  constructor(public headerRef: ElementRef<HTMLElement>, public renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initElements();
      this.initStyles();
      this.initEvents();
    });
  }

  initElements() {
    const parentElement = this.headerRef.nativeElement.parentElement;
    this.header = this.headerRef.nativeElement;

    this.toolbar = this.header.querySelector('ion-toolbar');
    if (!this.toolbar) { throw new Error('Parallax directive requires a toolbar or navbar element on the page to work.'); }
    this.ionTitle = this.toolbar.querySelector('ion-title');
    this.toolbarBackground = this.toolbar.shadowRoot.querySelector('.toolbar-background');

    this.barButtons = this.headerRef.nativeElement.querySelector('ion-buttons');
    const ionContent = parentElement.querySelector('ion-content');
    this.scrollContent = ionContent.shadowRoot.querySelector('.inner-scroll');
    if (!this.scrollContent) { throw new Error('Parallax directive requires an <ion-content> element on the page to work.'); }

    // Create image overlay
    this.imageOverlay = this.renderer.createElement('div');
    this.renderer.addClass(this.imageOverlay, 'image-overlay');

    this.colorOverlay = this.renderer.createElement('div');
    this.renderer.addClass(this.colorOverlay, 'color-overlay');

    this.colorOverlay.appendChild(this.imageOverlay);
    this.header.appendChild(this.colorOverlay);

    // Copy title and buttons
    this.overlayTitle = this.ionTitle && this.ionTitle.cloneNode(true) as HTMLElement;
    if (this.overlayTitle) {
      this.renderer.addClass(this.overlayTitle, 'parallax-title');
      setTimeout(() => {
        const toolbarTitle = this.overlayTitle.shadowRoot.querySelector('.toolbar-title');
        this.renderer.setStyle(toolbarTitle, 'pointer-events', 'unset');
      });
    }

    if (this.overlayTitle) { this.imageOverlay.appendChild(this.overlayTitle); }
    if (this.barButtons) { this.imageOverlay.appendChild(this.barButtons); }
  }

  initStyles() {
    this.headerHeight = this.scrollContent.clientHeight;
    this.ticking = false;

    if (!this.scrollContent || !toolbar) { return; }

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
    this.renderer.setStyle(this.colorOverlay, 'height', `${this.maximumHeight}px`);
    this.renderer.setStyle(this.colorOverlay, 'position', 'absolute');
    this.renderer.setStyle(this.colorOverlay, 'top', `${-this.headerMinHeight * 0}px`);
    this.renderer.setStyle(this.colorOverlay, 'left', '0');
    this.renderer.setStyle(this.colorOverlay, 'width', '100%');
    this.renderer.setStyle(this.colorOverlay, 'z-index', '10');
    this.renderer.setStyle(this.colorOverlay, 'pointer-events', 'none');

    // image overlay
    this.renderer.setStyle(this.imageOverlay, 'background-color', this.expandedColor);
    this.renderer.setStyle(this.imageOverlay, 'background-image', `url(${this.imageUrl || ''})`);
    this.renderer.setStyle(this.imageOverlay, 'height', `100%`);
    this.renderer.setStyle(this.imageOverlay, 'width', '100%');
    this.renderer.setStyle(this.imageOverlay, 'pointer-events', 'none');
    this.renderer.setStyle(this.imageOverlay, 'background-size', 'cover');
    this.renderer.setStyle(this.imageOverlay, 'background-position', 'center');

    // .toolbar-background
    this.renderer.setStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);

    // .bar-buttons
    if (this.barButtons) {
      this.renderer.setStyle(this.barButtons, 'pointer-events', 'all');
      Array.from(this.barButtons.children).forEach(btn => {
        this.renderer.setStyle(btn, 'color', this.titleColor);
      });
    }

    // .scroll-content
    if (this.scrollContent) {
      this.renderer.setAttribute(this.scrollContent, 'parallax', '');
      this.renderer.setStyle(this.scrollContent, 'padding-top',
        `${this.maximumHeight + this.scrollContentPaddingTop - this.headerMinHeight}px`);
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.headerHeight = this.scrollContent.clientHeight;
    }, false);

    if (this.scrollContent) {
      this.scrollContent.addEventListener('scroll', (e) => {

        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateElasticHeader();
          });
        }
        this.ticking = true;
      });
    }
  }

  updateElasticHeader() {
    if (!this.scrollContent || !toolbar) { return; }

    this.scrollTop = this.scrollContent.scrollTop;
    if (this.scrollTop >= 0) {
      this.translateAmt = this.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
    }

    // Parallax total progress
    this.headerMinHeight = this.toolbar.offsetHeight;
    let progress = (this.maximumHeight - this.scrollTop - this.headerMinHeight) / (this.maximumHeight - this.headerMinHeight);
    progress = Math.max(progress, 0);

    // ion-header: set height
    let targetHeight = this.maximumHeight - this.scrollTop;
    targetHeight = Math.max(targetHeight, this.headerMinHeight);

    // .toolbar-background: change color
    this.renderer.setStyle(this.imageOverlay, 'height', `${targetHeight}px`);
    this.renderer.setStyle(this.imageOverlay, 'opacity', `${progress}`);
    this.renderer.setStyle(this.colorOverlay, 'height', `${targetHeight}px`);
    this.renderer.setStyle(this.colorOverlay, 'opacity', targetHeight > this.headerMinHeight ? '1' : '0');
    this.renderer.setStyle(this.toolbarBackground, 'background-color',
      targetHeight > this.headerMinHeight ? 'transparent' : this.originalToolbarBgColor);

    // .bar-buttons
    if (this.barButtons) {
      if (targetHeight > this.headerMinHeight) {
        this.imageOverlay.append(this.barButtons);
      } else {
        this.toolbar.append(this.barButtons);
        Array.from(this.barButtons.children).forEach(btn => {
          this.renderer.setStyle(btn, 'color', 'unset');
        });
      }
    }

    this.ticking = false;
  }
}
