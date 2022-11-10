#!/bin/env bash

PACKAGE_VERSION=$(jq -r .version package.json)
MANIFEST_VERSION=$(jq -r .version src/manifest.json)

if [ "$PACKAGE_VERSION" != "$MANIFEST_VERSION" ]; then
    echo "versions mismatch: $PACKAGE_VERSION != $MANIFEST_VERSION";
    exit -1;
fi

GREP_CHANGELOG=$(grep -o "$PACKAGE_VERSION" CHANGELOG.md | wc -l)

if [ "$GREP_CHANGELOG" != 4 ]; then
    echo "update CHANGELOG: $PACKAGE_VERSION was found $GREP_CHANGELOG times instead of 4";
    exit -1;
fi

zip -r "warp-$MANIFEST_VERSION.zip" src
