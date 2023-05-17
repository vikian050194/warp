# warp

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]
[![Code coverage][coverage-badge]][coverage-url]

[![Chrome Web Store version][store-version-badge]][store-version-url]
[![Chrome Web Store rating][store-rating-badge]][store-rating-url]
[![Chrome Web Store rating][store-stars-badge]][store-stars-url]
[![Chrome Web Store users count][store-users-badge]][store-users-url]

## About

**warp** is Google Chrome extension for rapid jump to required bookmark.

## Motivation

It's a bit strange, but I did not found Google Chrome extension that can do something like "Ctrl+P" in VS Code or "Ctrl+T" in Slack. OK, I just will make it by my own. You can take a look at [list of questions and problems](./QA.md) that I faced during development.

UPD: There are few competitors, but all of them (that I have tested) have a bit different features, restrictions and main goal. **warp** will evolve further.

## Requirements

Developed and tested on `Version 109.0.5414.119 (Official Build) (64-bit)`

## Installation

**Chrome Web Store**

Just go [here][store-version-url] and click "Add to Chrome"

**From sources**

1. Clone repo
2. Open Chrome and navigate [here](chrome://extensions/)
3. Enable `Developer mode` via toggle
4. `Load unpacked` and select `src` directory of the cloned repo
5. Reboot Chrome - probably is not required step

## Usage

1. Activate extension
2. Find required bookmark via typing plus up and down arrows
3. Press `Enter` to override current tab or `Shift+Enter` to open new tab

### Configuration

Extension has few options.

You can [setup your own shortcut for activation](chrome://extensions/shortcuts), but default one is `Alt+W` or `Command+W`.

**Bookmarks**

| Name | Description |
| :--- | :--- |
| Use custom directory | Enable to be more specific (custom directory is in use) or disable for unlimited search (whole "Bookmarks bar") |
| Custom directory | Directory with bookmarks to search for. Name should be unique! |

**History**

| Name | Description |
| :--- | :--- |
| Maximum count of history items | All history items (starting from the oldest) that are above this threshold by count will be automatically deleted |
| Expiration time of history items | All history items that are older than this threshold will be automatically deleted |

**Results**

| Name | Description |
| :--- | :--- |
| Results per page | Results per page in the popup |
| Results sorting | Results sorting order |
| Results looping | Looping on attempt to move out of list boundaries |

**Appearance**

| Name | Description |
| :--- | :--- |
| Font size | Popup font size in pixels |
| Selected item color | Color of selected item in results list |
| Selected item font weight | Font weight of selected item in results list |
| Arrow pointer | Arrow appears in front of selected item |

**Tabs**

| Name | Description |
| :--- | :--- |
| Additional action | Press additional "Shift" (in other words "Shift+Enter") to open new tab if enabled and to update current tab if disabled |
| Keep group | Open new tab in the current group if it exists and additionaly press "Ctrl" to get opposite behaviour |
| Keep neighbour | Open new tab next to active one |

**Autoclosing**

| Name | Description |
| :--- | :--- |
| Autoclose enabled | Is popup autoclose enabled |
| Autoclose time | Popup autoclose time in seconds |

## Tests

`mocha` is used for unit testing and `c8` for coverage
`playwright` is used for e2e testing

`npm test` - run unit tests
`npm run cover` - run code coverage
`npm run test:ui` - run e2e tests

[status-url]: https://github.com/vikian050194/warp/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/warp.svg

[license-url]: https://github.com/vikian050194/warp/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/warp.svg

[coverage-url]: https://codecov.io/gh/vikian050194/warp
[coverage-badge]: https://img.shields.io/codecov/c/github/vikian050194/warp

[store-version-url]: https://chrome.google.com/webstore/detail/warp/kfpnmdafkjnbhidilikbkggjnmndobnc
[store-version-badge]: https://img.shields.io/chrome-web-store/v/kfpnmdafkjnbhidilikbkggjnmndobnc

[store-rating-url]: https://chrome.google.com/webstore/detail/warp/kfpnmdafkjnbhidilikbkggjnmndobnc
[store-rating-badge]: https://img.shields.io/chrome-web-store/rating/kfpnmdafkjnbhidilikbkggjnmndobnc

[store-stars-url]: https://chrome.google.com/webstore/detail/warp/kfpnmdafkjnbhidilikbkggjnmndobnc
[store-stars-badge]: https://img.shields.io/chrome-web-store/stars/kfpnmdafkjnbhidilikbkggjnmndobnc

[store-users-url]: https://chrome.google.com/webstore/detail/warp/kfpnmdafkjnbhidilikbkggjnmndobnc
[store-users-badge]: https://img.shields.io/chrome-web-store/users/kfpnmdafkjnbhidilikbkggjnmndobnc
