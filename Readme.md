# Parallax Header Directive for Ionic

This directive enables parallax effect on `ion-header` elements to display a cover photo while on top of the page and transition it to the normal navbar when content is scrolled down.

> For Ionic versions `< 5`, check the [previous tags](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) of this packate.

- [Live Demo](https://raschidjfr.github.io/ionic-header-parallax)
- [Code Playground](https://stackblitz.com/github/raschidjfr/ionic-header-parallax?file=src%2Fapp%2Fhome%2Fhome.page.html)

![alt text](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/master/gif.gif)

## Set Up

1. Install package: `$ npm i ionic-header-parallax`.
2. Import the directive into your desired module (usually `appmodule.ts`):

```ts
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

@NgModule({
  imports: [
    IonicHeaderParallaxModule,
    ...
```

## Usage

Just add the attribute `parallax` to any `<ion-header>` element:

```html
<ion-header parallax imageUrl="https://picsum.photos/350" height="350" bgPosition="top">
  <ion-toolbar color="primary">
    <ion-title> Parallax Header </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content> Some content here </ion-content>
```

| Parameter                                    | Description                                                                                                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `imageUrl (string)`                          | The background image to show while expanded.                                                                                                                |
| `height (number \| string)`                  | The height for the header when expanded. If the value is a number, it will be set in `px`. If the value is a string it will be passed as is (eg: `"20rem"`) |
| `color (string)`                             | The color (web hex formatted) to show while the header is expanded when no `imageUrl` is set. When scrolled it will fade to the toolbar's color.            |
| `bgPosition ('top' \| 'center' \| 'bottom')` | The position of the image in the header. This parameter slightly changes the feeling of the animation.                                                      |

## Source Code / Contributing

I don't plan to be maintaining this package full-time, but as I'm usually developing in Ionic I'll be glad to update it any time I make some upgrades for myself.
Contributions are very welcome. Find the instructions in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

Feel free to improve the code!

## Credits

Raschid JF. Rafaelly

<hello@raschidjfr.dev>

<https://raschidjfr.dev>
