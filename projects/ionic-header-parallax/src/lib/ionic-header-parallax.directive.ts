import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterContentInit,
} from '@angular/core';
import { IonToolbar } from '@ionic/angular';
import toPx from 'to-px';

@Directive({
  selector: 'ion-header[parallax]',
  standalone: true,
})
export class ParallaxDirective implements AfterContentInit {
  @Input() imageUrl = '';
  @Input() color = '';
  @Input() height: string | number = 300;
  @Input() bgPosition: 'top' | 'center' | 'bottom' = 'top';

  imageOverlay: HTMLElement | null = null;
  private toolbarBackground: HTMLElement | null = null;
  private innerScroll: HTMLElement | null = null;
  private originalToolbarHeight = 0;
  private ticking = false;
  private toolbarContainer: HTMLDivElement | null = null;
  private ionToolbar: IonToolbar & { el: HTMLIonToolbarElement; } | null = null;

  constructor(
    private headerRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterContentInit() {
    setTimeout(() => {
      try {
        if (this.initElements()) {
          this.setupContentPadding();
          this.setupImageOverlay();
          this.setupPointerEventsForButtons();
          this.setupEvents();
          this.updateProgress();
        } else {
          this.ngAfterContentInit();
        }
      } catch (e) {
        console.error(e);
        this.ngAfterContentInit();
      }
    }, 100);
  }

  private get header() {
    return this.headerRef.nativeElement;
  }

  /**
   * Return the value of the input parameter `height` as a string with units.
   * If no units were provided, it will default to 'px'.
   */
  getMaxHeightWithUnits() {
    return !isNaN(+this.height) || typeof this.height === 'number'
      ? this.height + 'px'
      : this.height;
  }

  getMaxHeightInPx() {
    return toPx(this.getMaxHeightWithUnits()) || 0;
  }

  private initElements() {
    try {
      this.ionToolbar = this.ionToolbar || this.headerRef.nativeElement.querySelector('ion-toolbar') as any;
      if (!this.ionToolbar) {
        console.error('A <ion-toolbar> element is needed inside <ion-header>');
        return false;
      } else {
        this.originalToolbarHeight = this.ionToolbar.el.offsetHeight;
        this.toolbarContainer = this.ionToolbar.el.shadowRoot?.querySelector('.toolbar-container') || null;
        this.toolbarBackground = this.ionToolbar.el.shadowRoot?.querySelector('.toolbar-background') || null;
        this.color = this.color || (
          this.toolbarBackground && window.getComputedStyle(this.toolbarBackground).backgroundColor
        ) || '';
      }

      const parentElement = this.header?.parentElement;
      const ionContent = parentElement?.querySelector('ion-content');
      if (!ionContent) {
        console.error('A <ion-content> element is needed');
        return false;
      } else {
        this.innerScroll = ionContent.shadowRoot?.querySelector('.inner-scroll') || null;
      }

      if (!this.renderer) {
        return false;
      } else {
        this.renderer.setStyle(this.toolbarContainer, 'align-items', 'baseline');
      }
    } catch (e) {
      console.warn(e);
      return false;
    }

    return true;
  }

  private setupPointerEventsForButtons() {
    this.renderer.setStyle(this.header, 'pointer-events', 'none');
    this.ionToolbar?.el
      .querySelectorAll('ion-buttons')
      .forEach(item => this.renderer.setStyle(item, 'pointer-events', 'all'));
  }

  private setupContentPadding() {
    const { paddingTop } = window.getComputedStyle(this.innerScroll as Element);
    const contentPaddingPx = toPx(paddingTop) || 0;
    const coverHeightPx = this.getMaxHeightInPx();
    this.renderer.setStyle(this.header, 'position', 'absolute');
    this.renderer.setStyle(this.innerScroll, 'padding-top', `${contentPaddingPx + coverHeightPx}px`);
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

    this.imageOverlay && this.toolbarBackground?.appendChild(this.imageOverlay);
  }

  private setupEvents() {
    this.innerScroll?.addEventListener('scroll', (_event) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateProgress();
          this.ticking = false;
        });
      }
      this.ticking = true;
    });
  }

  /** Update the parallax effect as per the current scroll of the ion-content */
  updateProgress() {
    const h = this.getMaxHeightInPx();
    const progress = this.innerScroll && this.calcProgress(this.innerScroll, h) || 0;
    this.progressLayerHeight(progress);
    this.progressLayerOpacity(progress);
  }

  progressLayerHeight(progress: number) {
    const h = Math.max(
      this.getMaxHeightInPx() * (1 - progress),
      this.originalToolbarHeight
    );
    this.renderer.setStyle(this.toolbarContainer, 'height', `${h}px`);
    this.renderer.setStyle(this.imageOverlay, 'height', `${h}px`);
  }

  progressLayerOpacity(progress: number) {
    const op = 1 - progress;
    this.renderer.setStyle(this.imageOverlay, 'opacity', op);
  }

  private calcProgress(scrollingElement: HTMLElement, maxHeight: number) {
    const scroll = +scrollingElement.scrollTop;
    const progress = Math.min(1, Math.max(0, scroll / maxHeight));
    return progress;
  }
}
