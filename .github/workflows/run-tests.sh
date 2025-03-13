#!/bin/sh
PKG_VERSION=$(cd $GITHUB_WORKSPACE/dist/ionic-header-parallax && npm pkg get version | tr -d '"')
mkdir cypress
cp -r $GITHUB_WORKSPACE/cypress/* ./cypress
cp $GITHUB_WORKSPACE/cypress.config.ts .
cp -r $GITHUB_WORKSPACE/src/app/home/* ./src/app/home
npm i $GITHUB_WORKSPACE/dist/ionic-header-parallax-$PKG_VERSION.tgz
cypress install
ng serve --host 0.0.0.0 --port 4200 & \
(wait-on http://0.0.0.0:4200 --timeout 30000 --interval 1000 && cypress run --headless) \
|| { echo 'Angular server failed to start'; exit 1; }