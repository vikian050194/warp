# warp

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]
[![Code coverage][coverage-badge]][coverage-url]

## About

**warp** is Google Chrome extension for rapid jump to required bookmark.

## Motivation

It's a bit strange, but I did not found Google Chrome extension that can do something like "Ctrl+P" in VS Code or "Ctrl+T" in Slack. OK, I just will make it by my own. You can take a look at [list of questions and problems](./QA.md) that I faced during development.

## Requirements

Developed and tested on `Version 100.0.4896.75 (Official Build) (64-bit)`

## Installation

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

| Name | Description |
| :--- | :--- |
| Root directory | Bookmarks directory to scan |

## Tests

`mocha` and `assert` are used for testing and `c8` for coverage

`npm test` - run tests

`npm run cover` - run code coverage

[status-url]: https://github.com/vikian050194/warp/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/warp.svg

[license-url]: https://github.com/vikian050194/warp/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/warp.svg

[coverage-url]: https://codecov.io/gh/vikian050194/warp
[coverage-badge]: https://img.shields.io/codecov/c/github/vikian050194/warp
