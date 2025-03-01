import { NgModule } from '@angular/core';
import { ParallaxDirective } from './ionic-header-parallax.directive';

@NgModule({
  imports: [
    ParallaxDirective
  ],
  exports: [
    ParallaxDirective
  ]
})
export class IonicHeaderParallaxModule { }
