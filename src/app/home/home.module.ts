import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

// This module is kept to test backward compatibility with Angular projects
// that do not use standalone components.

@NgModule({
  declarations: [HomePage],
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
  ]
})
export class HomePageModule {}
