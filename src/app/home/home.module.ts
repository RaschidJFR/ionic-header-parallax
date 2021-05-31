import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
// import { IonicHeaderParallaxModule } from '../../../projects/ionic-header-parallax/src'; // <- Uncomment this to edit library

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    IonicHeaderParallaxModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
