#!/bin/bash
# Use this to test the angular project with cypress.
# Execute from the project's root folder.

get_lib_version() {
  echo $(cd dist/ionic-header-parallax && npm pkg get version)
}

run_test() {
  version=$1
  docker run \
    --rm \
    -v "$PWD:/project" \
    -v "$PWD/dist/ionic-header-parallax:/dist" \
    raschidjfr/ionic-blank:ionic8-angular19-cypress14 \
    bash -c "\
      mkdir cypress \
      && cp -r /project/cypress/* ./cypress \
      && cp /project/cypress.config.ts . \
      && cp -r /project/src/app/home/* ./src/app/home \
      && npm i /dist/ionic-header-parallax-$version.tgz \
      && ng serve --host 0.0.0.0 --port 4200 \
      & (wait-on http://0.0.0.0:4200 && cypress run --headless) \
      || { echo 'Angular server failed to start'; exit 1; }"
}

lib_version=$(get_lib_version)
run_test $lib_version