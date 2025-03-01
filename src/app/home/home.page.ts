import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ParallaxDirective } from 'ionic-header-parallax';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, ParallaxDirective]
})
export class HomePage {

  constructor() {}

}
