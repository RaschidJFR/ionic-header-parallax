# Parallax Header Directive for Ionic

This directive enables parallax effect on `ion-header` elements to display a cover photo while on top of the page and transition it to the normal navbar when content is scrolled down.

### Compatibility

| Stack                                                                                                          | Tag                                                                             |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ![](https://img.shields.io/badge/-v7-white?logo=ionic) ![](https://img.shields.io/badge/-v14-red?logo=angular) | [5.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v6-white?logo=ionic) ![](https://img.shields.io/badge/-v13-red?logo=angular) | [4.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v5-white?logo=ionic) ![](https://img.shields.io/badge/-v12-red?logo=angular) | [3.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v4-white?logo=ionic) ![](https://img.shields.io/badge/-v8-red?logo=angular)  | [2.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |

## Live Demo
Checkout the Live Demo [here](https://raschidjfr.github.io/ionic-header-parallax)

![](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/5.0.0/img/ios.gif)
![](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/5.0.0/img/android.gif)



## Set Up

1. Install package: `npm i ionic-header-parallax`.
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
<ion-header
  parallax
  imageUrl="https://picsum.photos/350"
  height="350"
  bgPosition="top"
>
  <ion-toolbar color="primary">
    <ion-title> Parallax Header </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content> Some content here </ion-content>
```

| Parameter  | Type                            | Description                                                                                                                                                 |
| ---------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| imageUrl   | `string`                        | The background image to show while expanded.                                                                                                                |
| height     | ` number \| string`             | The height for the header when expanded. If the value is a number, it will be set in `px`. If the value is a string it will be passed as is (eg: `"20rem"`) |
| color      | `string`                        | The color (web hex formatted) to show while the header is expanded when no `imageUrl` is set. When scrolled it will fade to the toolbar's color.            |
| bgPosition | `'top' \| 'center' \| 'bottom'` | The position of the image in the header. This parameter slightly changes the feeling of the animation.                                                      |

## Contributing

I don't plan to be maintaining this package full-time, but as I'm usually developing in Ionic I'll be glad to update it any time I make some upgrades for myself.
Code contributions, issues and PRs are very welcome. Find the instructions in the [CONTRIBUTING.md](CONTRIBUTING.md) file.
