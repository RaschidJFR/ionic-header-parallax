import { Directive, Renderer, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'ion-header[parallax]', // Attribute selector
})
export class ParallaxDirective {
  @Input('imageUrl') backgroundImageUrl: string = '';
  @Input('parallaxColor') expandedColor: string = '#ab26c3';
  @Input('fadeTitle') fadeTitle: boolean = false;
  @Input('maximumHeight') headerMaxHeight: number = 200;

  header: HTMLElement;
  @Input() toolbar: HTMLElement;
  toolbarBackground: HTMLElement;
  toolbarBackgroundOverlay: HTMLElement;
  barButtons: HTMLElement[];
  fixedContent: HTMLElement;
  scrollContent: HTMLElement;
  headerHeight: any;
  headerMinHeight: number;
  translateAmt: any;
  scaleAmt: any;
  scrollTop: any;
  lastScrollTop: any;
  ticking: any;
  originalToolbarBgColor: string;
  ionTitle: HTMLElement;

  constructor(public headerRef: ElementRef, public renderer: Renderer) {
  }

  ngAfterViewInit() {

    let parentElement = this.headerRef.nativeElement.parentElement;
    this.header = this.headerRef.nativeElement;
    this.toolbar = this.headerRef.nativeElement.getElementsByClassName('toolbar')[0];
    if (!this.toolbar) throw 'Parallax directive requires a toolbar or navbar element on the page to work.'
    this.ionTitle = this.toolbar.getElementsByClassName('title')[0] as HTMLElement;
    this.toolbarBackground = this.headerRef.nativeElement.getElementsByClassName('toolbar-background')[0];
    this.toolbarBackground.innerHTML = `<div style="width:100%; height:100%" class="overlay"></div>`;
    this.toolbarBackgroundOverlay = this.toolbarBackground.getElementsByClassName('overlay')[0] as HTMLElement;
    this.barButtons = Array.from(this.headerRef.nativeElement.getElementsByClassName('bar-buttons'));
    let backButton = this.headerRef.nativeElement.getElementsByClassName('back-button')[0];
    if (backButton) this.barButtons.push(backButton);
    this.fixedContent = parentElement.getElementsByClassName('fixed-content')[0];
    this.scrollContent = parentElement.getElementsByClassName('scroll-content')[0];
    if (!this.scrollContent) throw 'Parallax directive requires a <ion-content> element on the page to work.'

    this.headerHeight = this.scrollContent.clientHeight;
    this.ticking = false;

    window.addEventListener('resize', () => {
      this.headerHeight = this.scrollContent.clientHeight;
    }, false);

    if (this.scrollContent)
      this.scrollContent.addEventListener('scroll', () => {

        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateElasticHeader();
          });
        }
        this.ticking = true;
      });

    if (!this.scrollContent || !toolbar) return;

    // fetch styles
    this.headerMaxHeight = parseFloat(this.headerMaxHeight.toString());
    this.headerMinHeight = this.toolbar.offsetHeight
    let scrollContentPaddingTop: any = window.getComputedStyle(this.scrollContent, null).paddingTop.replace('px', '');
    scrollContentPaddingTop = parseFloat(scrollContentPaddingTop);
    this.originalToolbarBgColor = window.getComputedStyle(this.toolbarBackground, null).backgroundColor;

    // .header
    this.renderer.setElementStyle(this.header, 'height', `${this.headerMaxHeight}px`);

    // .toolbar .title
    if (this.fadeTitle) this.renderer.setElementStyle(this.ionTitle, 'opacity', '0');

    // .toolbar-background .overlay
    this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'background-color', this.expandedColor);
    this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'background-image', `url(${this.backgroundImageUrl || ''})`);

    // .toolbar-background
    this.renderer.setElementStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);

    // .bar-buttons
    this.barButtons.forEach(element => {
      this.renderer.setElementStyle(element, 'bottom', `${this.toolbar.offsetHeight / 2 - this.headerMinHeight / 2}px`);
    });

    // .fixed-content
    if (this.fixedContent) this.renderer.setElementAttribute(this.fixedContent, 'parallax', 'true');

    // .scroll-content
    if (this.scrollContent) {
      this.renderer.setElementAttribute(this.scrollContent, 'parallax', 'true');
      this.renderer.setElementStyle(this.scrollContent, 'padding-top', `${this.headerMaxHeight + scrollContentPaddingTop}px`);
    }
  }

  updateElasticHeader() {
    if (!this.scrollContent || !toolbar) return;

    this.scrollTop = this.scrollContent.scrollTop;

    if (this.scrollTop >= 0) {
      this.translateAmt = this.scrollTop / 2;
      this.scaleAmt = 1;
    } else {
      this.translateAmt = 0;
      this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
    }

    // Parallax progress
    let progress = (this.headerMaxHeight - this.scrollTop - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight);
    progress = Math.max(progress, 0);

    // header
    let targetHeight = this.headerMaxHeight - this.scrollTop;
    targetHeight = Math.max(targetHeight, this.headerMinHeight);
    this.renderer.setElementStyle(this.header, 'height', `${targetHeight}px`)

    // .toolbar .title
    if (this.fadeTitle) this.renderer.setElementStyle(this.ionTitle, 'opacity', `${1 - progress}`);

    // .toolbar-background
    this.renderer.setElementStyle(this.toolbarBackgroundOverlay, 'opacity', `${progress}`);
    this.renderer.setElementStyle(this.toolbarBackground, 'background-color', this.originalToolbarBgColor);

    // .bar-buttons
    this.barButtons.forEach(element => {
      let h = element.offsetHeight;
      this.renderer.setElementStyle(element, 'bottom', `${this.toolbar.offsetHeight / 2 - this.headerMinHeight / 2}px`);
    });

    this.ticking = false;

  }
}
