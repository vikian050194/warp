#!/bin/env bash

PACKAGE_VERSION=$(jq -r .version package.json)
MANIFEST_VERSION=$(jq -r .version src/manifest.json)

if [ "$PACKAGE_VERSION" == "$MANIFEST_VERSION" ]; then
    zip -r "warp-$MANIFEST_VERSION.zip" src
else
    echo "versions mismatch: $PACKAGE_VERSION != $MANIFEST_VERSION"
fi
