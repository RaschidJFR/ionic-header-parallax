#!/bin/sh
# Use this to test the angular project with cypress

HOME_COMPONENT_PATH="$PWD/component"
CYPRESS_CONFIG_PATH="$PWD/tests"
DIST_PATH="$PWD/../dist/ionic-header-parallax"

docker run \
  --rm \
  -v "$HOME_COMPONENT_PATH:/app/src/app/home" \
  -v "$CYPRESS_CONFIG_PATH:/cypress" \
  -v "$DIST_PATH:/dist" \
  -p 4200:4200 \
  -ti \
  raschidjfr/ionic-blank:ionic8-angular19-cypress14 \
  sh -c "
    npm i && \
    npm i ionic-header-parallax@next cypress && \
    npm i -g wait-on && \
    cp -r /cypress/* . && \
    (ng serve --host 0.0.0.0 --port 4200 & \
    wait-on http://0.0.0.0:4200 && \
    npx cypress run)
  "
