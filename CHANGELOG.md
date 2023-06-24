# Changelog

## [5.0.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/5.0.0) (2023-06-23)

### BREAKING CHANGES

- Updated to Ionic7 and Angular v14

## [4.0.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/4.0.0) (2023-06-23)

### BREAKING CHANGES

- Updated to Ionic6 and Angular v13

## [3.1.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/3.1.0) (2021-12-09)

### Changed

- Increased peerDependency version range to support Angular 13 and Ionic 6 (Thanks [@hakimio](https://github.com/hakimio))

### Fixed

- fix(height): string-type inputs not correctly parsed (#44)

## [3.0.2](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/3.0.2) (2021-11-30)

### BREAKING CHANGES

- Upgraded to Ionic v5 + Angular 12
- Dropped parameters `showButtonsExpanded` and `titleColor`
- Renamed parameters `expandedColor` and `maximumHeight`

### Added

- Added parameter `bgPosition`

### Changed

- Redid functions with a simpler dom structure. Ionic elements are no longer being cloned or moved. This allows to keep the toolbar's original structure unaltered

### Fixed

- Added recursive initializer to avoid error when view not ready yet (#29) (Thanks [@AdaLollA](https://github.com/AdaLollA))
- Fixed #34: TypeError: Cannot read property 'style' of null

## [2.1.4](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.1.4) (2019-08-19)

### Changed

- Added contact details to Readme

## [2.1.3](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.1.3)

### Changed

- Updated Readme and republished package as v1.1.0 was just published.

## [2.1.2](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.1.2)

### Changed

- Updated Readme.

## [2.1.1](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.1.1)

### Fixed

- [Issue #8: titleColor not working as expected ionic4](https://github.com/RaschidJFR/ionic-header-parallax/issues/8)

## [2.1.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.1.0)

### Changed

- Set default value for attribute `maximumHeight` to `300`.

### Fixed

- Runtime error when either element `<ion-title>` or `<ion-buttons>` where missing.

## [2.0.1](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.0.1)

### Fixed

- Updated documentation

## [2.0.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/2.0.0)

Upgraded to Ionic 4

### Changed

- Set up repo as [angular library](https://angular.io/guide/creating-libraries).
- Renamed attribute `parallaxColor` to `expandedColor`

### Removed

- `fadeTitle` attribute no longer needed as it is now the default behavior.

## [1.1.0](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/1.1.0)

### Changed

- Exporting module instead of directive: IonicParallaxHeaderModule instead of ParallaxDirective

### Fixed

- Issue #6: ParallaxDirective Not Found

## [1.0.1](https://github.com/RaschidJFR/ionic-header-parallax/releases/tag/1.0.1)

First release, for Ionic 3
