import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { IonToolbar, IonButtons, IonTitle } from '@ionic/angular';

@Directive({
  selector: 'ion-header[parallax]',
})
export class ParallaxDirective implements AfterContentInit {
  @Input() imageUrl: string;
  @Input() color: string;
  @Input() height: string | number = 300;
  @Input() bgPosition: 'top' | 'center' | 'bottom' = 'top';

  imageOverlay: HTMLElement;
  private toolbarBackground: HTMLElement;
  private innerScroll: HTMLElement;
  private originalToolbarHeight = 0;
  private ticking = false;
  private toolbarContainer: HTMLDivElement;

  @ContentChild(IonTitle, { static: false }) ionTitle: IonTitle & {
    el: HTMLIonTitleElement;
  };
  @ContentChild(IonToolbar, { static: false }) ionToolbar: IonToolbar & {
    el: HTMLIonToolbarElement;
  };
  @ContentChildren(IonButtons) ionButtons: QueryList<
    IonButtons & { el: HTMLElement }
  >;

  constructor(
    private headerRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterContentInit() {
    setTimeout(() => {
      try {
        this.initElements();
        this.setupContentPadding();
        this.setupImageOverlay();
        this.initEvents();
        this.updateProgress();
      } catch (e) {
        this.ngAfterContentInit();
      }
    }, 100);
  }

  private get header() {
    return this.headerRef.nativeElement;
  }

  getMaxHeightWithUnits() {
    return !isNaN(+this.height) || typeof this.height === 'number'
      ? this.height + 'px'
      : this.height;
  }

  getCurrentHeight() {
    return this.ionToolbar?.el?.clientHeight;
  }

  private initElements() {
    const parentElement = this.header.parentElement;
    const ionContent = parentElement.querySelector('ion-content');
    this.innerScroll = ionContent.shadowRoot.querySelector(
      '.inner-scroll'
    ) as HTMLElement;

    this.originalToolbarHeight = this.ionToolbar.el.offsetHeight;

    this.toolbarContainer =
      this.ionToolbar.el.shadowRoot.querySelector('.toolbar-container');

    this.toolbarBackground = this.ionToolbar.el.shadowRoot.querySelector(
      '.toolbar-background'
    );

    this.renderer.setStyle(this.header, 'pointer-events', 'none');
    this.renderer.setStyle(this.toolbarContainer, 'pointer-events', 'all');
    this.renderer.setStyle(this.toolbarContainer, 'align-items', 'baseline');
  }

  private setupContentPadding() {
    const parentElement = this.header.parentElement;
    const ionContent = parentElement.querySelector('ion-content');
    const mainContent = ionContent.shadowRoot.querySelector('main');
    const { paddingTop } = window.getComputedStyle(mainContent, null);
    const calc = `calc(${paddingTop} + ${this.getMaxHeightWithUnits()})`;
    this.renderer.setStyle(this.header, 'position', 'absolute');
    this.renderer.setStyle(this.innerScroll, 'padding-top', calc);
  }

  private setupImageOverlay() {
    this.imageOverlay = this.renderer.createElement('div');
    this.renderer.addClass(this.imageOverlay, 'image-overlay');

    this.renderer.setStyle(this.imageOverlay, 'background-color', this.color);

    this.renderer.setStyle(
      this.imageOverlay,
      'background-image',
      `url(${this.imageUrl || ''})`
    );

    this.renderer.setStyle(this.imageOverlay, 'height', `100%`);
    this.renderer.setStyle(this.imageOverlay, 'width', '100%');
    this.renderer.setStyle(this.imageOverlay, 'background-size', 'cover');
    this.renderer.setStyle(
      this.imageOverlay,
      'background-position',
      this.bgPosition
    );

    this.toolbarBackground.appendChild(this.imageOverlay);
  }

  private initEvents() {
    this.innerScroll.addEventListener('scroll', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateProgress();
          this.ticking = false;
        });
      }
      this.ticking = true;
    });
  }

  updateProgress() {
    const progress = this.calcProgress(this.innerScroll, +this.height);
    this.progressLayerHeight(progress);
    this.progressLayerOpacity(progress);
  }

  progressLayerHeight(progress: number) {
    const h = Math.max(
      +this.height * (1 - progress),
      this.originalToolbarHeight
    );
    this.renderer.setStyle(this.toolbarContainer, 'height', `${h}px`);
    this.renderer.setStyle(this.imageOverlay, 'height', `${h}px`);
  }

  progressLayerOpacity(progress: number) {
    const op = 1 - progress;
    this.renderer.setStyle(this.imageOverlay, 'opacity', op);
    // this.renderer.setStyle(this.toolbarContainer, 'opacity', progress);
  }

  private calcProgress(scrollingElement: HTMLElement, maxHeight: number) {
    const scroll = +scrollingElement.scrollTop;
    const progress = Math.min(1, Math.max(0, scroll / maxHeight));
    return progress;
  }
}
