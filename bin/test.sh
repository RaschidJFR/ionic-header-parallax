#!/bin/bash
# Use this to test the angular project with cypress.
# Execute from the project's root folder.
# Usage: bin/test.sh [angular_version]

get_lib_version() {
  echo $(cd dist/ionic-header-parallax && npm pkg get version)
}

run_test() {
  ng_version=$1
  lib_version=$(get_lib_version)
  docker run \
    --rm \
    -ti \
    -v "$PWD:/project" \
    -v "$PWD/dist:/dist" \
    raschidjfr/ionic-blank:ionic8-angular$ng_version-cypress14 \
    bash -c "\
      mkdir cypress \
      && cp -r /project/cypress/* ./cypress \
      && cp /project/cypress.config.ts . \
      && cp -r /project/src/app/home/* ./src/app/home \
      && npm i /dist/ionic-header-parallax-$lib_version.tgz \
      && (ng serve --host 0.0.0.0 --port 4200 \
      & (wait-on http://0.0.0.0:4200 && cypress run --headless) \
      || { echo 'Angular server failed to start'; exit 1; })"
}

ng_version="${1:-19}"
echo "Testing library in Ionic v8 and Angular v$ng_version..."
run_test $ng_version