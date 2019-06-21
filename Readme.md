# Parallax Header Directive for Ionic v4 #

> For Ionic 3 use version [1.0.1](https://www.npmjs.com/package/ionic-header-parallax/v/1.0.1) of this package: `$ npm ionic-header-parallax@1.0.1`.

This directive enables parallax effect on `ion-header` elements to display a cover photo while on top of the page and transition it to the normal navbar when content is scrolled down.

![alt text](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/master/gif.gif)

## Set Up ##

1. Install package: `$ npm ionic-header-parallax`.
2. Import the directive into your desired module (usually `app.module.ts`):

```
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

@NgModule({
  imports: [
    IonicHeaderParallaxModule,
    ...
```

## Usage ##

Just add the attribute `parallax` to any `<ion-header>` element:

```
<ion-header parallax></ion-header>
```

Optional attributes:

* `imageUrl (string)`: The background image to show while expanded.
* `maximumHeight (number)`: The height for the header when expanded. Default is `200`.
* `expandedColor (string)`: The color (web hex formatted) to show while the header is expanded when no `imageUrl` is set. When scrolled it will fade to the navbar/toolbar's color or the one configured in `<toolbar color="">` attribute.
* `titleColor (string)`: The text color (web hex formatted) for `<ion-title>` and `<ion-back-button>` elements when expanded. They will turn to their default color on cover collapse.

Example:

```
<ion-header parallax imageUrl="https://picsum.photos/350" maximumHeight="350" expandedColor="#AAA" titleColor="black">

  <ion-toolbar color="primary">
    <ion-title>
      Parallax Header
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
	Some content here
</ion-content>
```

## Modifying the Source Code ##
In case you need to make your own modifications, the package is pritty simple, just 1 .ts file. You can clone the repo wherever in your ionic project (usually inside  the `directives` folder): `$ git clone https://github.com/RaschidJFR/ionic-header-parallax.git`. Then edit the file `src/lib/parallax.directive.ts`.

## Credits ##
This is an implementation of this awesome tutorial on v2 by [Josh Morony](https://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/). Thanks.

## Contributing ##

I don't plan to be full-time mantaining this package, but as I'm usually developing in Ionic I'll be glad to update it any time I make some upgrades for myself.
Contributions are very welcome. The source files can be found in the [repo](https://github.com/RaschidGithub/ionic-header-parallax).