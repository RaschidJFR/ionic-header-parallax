# Parallax Header Directive for Ionic

This directive enables a parallax effect on `ion-header` elements to display a cover photo while on top of the page and transition to the normal *toolbar* when scrolling down.

### Compatibility

| Stack                                                                                                          | Tag                                                                             |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ![](https://img.shields.io/badge/-v8-white?logo=ionic) ![](https://img.shields.io/badge/-v16-red?logo=angular) | [6.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v7-white?logo=ionic) ![](https://img.shields.io/badge/-v14-red?logo=angular) | [5.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v6-white?logo=ionic) ![](https://img.shields.io/badge/-v13-red?logo=angular) | [4.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v5-white?logo=ionic) ![](https://img.shields.io/badge/-v12-red?logo=angular) | [3.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |
| ![](https://img.shields.io/badge/-v4-white?logo=ionic) ![](https://img.shields.io/badge/-v8-red?logo=angular)  | [2.x.x](https://www.npmjs.com/package/ionic-header-parallax?activeTab=versions) |

## Live Demo

Checkout the Live Demo [here](https://raschidjfr.github.io/ionic-header-parallax)

| iOS                                                                                       | Android                                                                                       |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/5.0.0/img/ios.gif) | ![](https://raw.githubusercontent.com/raschidJFR/ionic-header-parallax/5.0.0/img/android.gif) |

## Set Up
1. Install package: `npm i ionic-header-parallax`.
2. Import the directive into your desired Module:

    ```ts
    // app.module.ts
    
    import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

    @NgModule({
      imports: [
        IonicHeaderParallaxModule,  // <-
        ...
    ```
    …or standalone Component:
    ```ts
    // my-component.page.ts

    import { ParallaxDirective } from 'ionic-header-parallax';

    @Component({
      imports: [
        ParallaxDirective,    // <-
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

| Parameter  | Type                            | Description                                                                                                                                                 |
| ---------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| imageUrl   | `string`                        | The background image to show while expanded.                                                                                                                |
| height     | ` number \| string`             | The height for the header when expanded. If the value is a number, it will be set in `px`. If the value is a string it will be passed as is (eg: `"20rem"`) |
| color      | `string`                        | The color (web hex formatted) to show while the header is expanded when no `imageUrl` is set. When scrolled, it will fade to the toolbar's color.           |
| bgPosition | `'top' \| 'center' \| 'bottom'` | The position of the image in the header. This parameter slightly changes the feeling of the animation. Default: `'top'`                                     |

