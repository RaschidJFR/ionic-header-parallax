# Parallax Header Directive for Ionic v3 #

>**Note**: For ionic v4 use the latest version of this package.

This directive enables parallax effect on `ion-header` elements to display a cover photo while on top of the page and transition it to the normal navbar when content is scrolled down.

![alt text](https://raw.githubusercontent.com/RaschidGithub/ionic-header-parallax/master/gif.gif)

## Set Up ##

1 Install package.

2 Import stylesheet into `app.scss` (or any other global style file):

```
 @import "../node_modules/ionic-header-parallax/sass/ionic-header-parallax.scss"; //<-- Or whatever path into node_modules
 ```

3 Import the directive into the required module(s) (usually `app.module.ts` or into every module that uses the directive if you're using **lazy loading**):

```
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

@NgModule({
    imports: [
    	IonicHeaderParallaxModule
    ]
		...
```


## Usage ##

Just add the attribute `parallax` to any `<ion-header>` element:

```
<ion-header parallax></ion-header>
```

Optional attributes:

* `imageUrl`: The background image to show while expanded.
* `fadeTitle`: It will make transparent the text from `<ion-title>` or any `.title` element in the header, and show it when scrolled. Default is `false`.
* `maximumHeight`: The height for the header when expanded. Default is `200`.
* `parallaxColor`: The color (web hex formatted) to show while the header is expanded if no `imageUrl` is set. When scrolled it will fade to the navbar/toolbar's color or the one configured in `<navbar color="">` attribute.

Example:

```
<ion-header parallax
	[fadeTitle]="true"
	imageUrl="https://ununsplash.imgix.net/photo-1421091242698-34f6ad7fc088?fit=crop&fm=jpg&h=650&q=75&w=950"
	maximumHeight="350"
	parallaxColor="#ab26c3">

	<ion-navbar color="secondary">
		<ion-title>My Parallax Header</ion-title>
	</ion-navbar>

</ion-header>

<ion-content padding>
	<div style="height: 200vh;"></div>
</ion-content>
```

## Credits ##
This is an implementation of the really great tutorial by [Josh Morony](https://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/). Thanks.

## Contributing ##

I don't plan to be full-time mantaining this package, but as I'm usually developing in Ionic I'll be glad to update it any time I make some upgrades for myself.
Contributions are very welcome. The source files (actually just one only .ts file) can are found in the [repo](https://github.com/RaschidGithub/ionic-header-parallax).