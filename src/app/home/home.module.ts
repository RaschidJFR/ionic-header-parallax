import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax'
import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [IonicHeaderParallaxModule, IonicModule],
  exports: [HomePage],
})
export class HomePageModule {
  constructor() {}
}
