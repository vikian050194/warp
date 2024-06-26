# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.21.0] - 2024-06-17

### Added

- "Split search" and "Abbreviation search" options

## [1.20.0] - 2024-06-15

### Added

- "Starts with" option

## [1.19.0] - 2024-04-03

### Added

- "Case sensitivity" option

### Changed

- Default case sensitivity value is "false" instead of "true and then false"

## [1.18.0] - 2024-02-11

### Added

- Help page
- Help extension menu item

### Changed

- Help page is automatically opened on initial install instead of Changelog page

## [1.17.0] - 2023-12-19

### Added

- Download bookmarks and history in `json`, `csv` and `tsv` formats

## [1.16.1] - 2023-10-11

### Fixed

- Version is shown on manual changelog page opening

## [1.16.0] - 2023-08-25

### Added

- Version on all pages

## [1.15.1] - 2023-08-15

### Fixed

- Search speed and accuracy

## [1.15.0] - 2023-08-02

### Changed

- Homepage URL is leading to project site

## [1.14.0] - 2023-07-30

### Added

- Option to prevent changelog automatic showing

## [1.13.0] - 2023-07-25

### Added

- Changelog page as-is
- Changelog page is automatically opened on version update
- Changelog extension menu item

## [1.12.0] - 2023-07-13

### Added

- Truncate options with ellipsis

## [1.11.0] - 2023-07-07

### Added

- Delete unnecessary history and frequency item

## [1.10.3] - 2023-07-01

### Fixed

- Results per page values duplication

## [1.10.2] - 2023-06-24

### Fixed

- Show value of 0 seconds autoclose time

## [1.10.1] - 2023-06-20

### Fixed

- Do not try to adjust autoclose time on version update

## [1.10.0] - 2023-06-17

### Added

- Full options description available in modal popup box
- Automatic page reload on counters reset

### Changed

- Font size options without "px"
- History expiration time options without "day(s)"

### Removed

- Short inline description of options

## [1.9.3] - 2023-05-31

### Fixed

- Active option index after empty list

## [1.9.2] - 2023-05-30

### Fixed

- Adjust active option on list update

## [1.9.1] - 2023-05-30

### Fixed

- Reset active option on list update

## [1.9.0] - 2023-05-27

### Changed

- Popup query has not placeholder but has blinking cursor

## [1.8.0] - 2023-05-17

### Added

- Reload page on history and frequency reset
- History and frequency pages shows "no data" message
- History expiration 90 days and 180 days options

### Changed

- New options marked as "new"
- "back" and "next" pager signs are colored if action available
- Popup query placeholder is "start typing"
- History items max count step is one

## [1.7.0] - 2023-03-05

### Added

- Options have pins and tabs

## [1.6.0] - 2023-02-22

### Added

- Configure popup autoclosing and autoclosing time

## [1.5.1] - 2023-02-20

### Changed

- Description in manifest.json

## [1.5.0] - 2023-02-18

### Added

- Move new tab next to active one
- Options to move tab next to active one only in particular cases

### Changed

- Rename option `Current group` to `Keep group`

## [1.4.0] - 2023-02-04

### Added

- Option to loop results

### Changed

- New options notice is blinking star of selected item color

## [1.3.2] - 2023-01-14

### Fixed

- Nothing

## [1.3.1] - 2022-11-11

### Fixed

- Nothing

## [1.3.0] - 2022-11-10

### Added

- Action on Shift+Enter is configurable

## [1.2.1] - 2022-11-10

### Fixed

- Update current tab is broken

## [1.2.0] - 2022-11-08

### Added

- Open new tab in the current group of tabs

## [1.1.0] - 2022-11-02

### Changed

- Colors list for selected item

## [1.0.1] - 2022-09-17

### Fixed

- Header is not pinned
- Footer has transparent background
- History items indexes are not match date based items sorting

## [1.0.0] - 2022-08-25

### Added

- Abbreviation search

## [0.10.0] - 2022-08-07

### Added

- Selected item font weight
- Arrow pointer

## [0.9.0] - 2022-08-02

### Added

- Selected item color
- Font size

## [0.8.0] - 2022-07-29

### Added

- Results sorting order: as is, alphabet, history and frequency

## [0.7.1] - 2022-07-26

### Fixed

- Counters are reseted on service worker loading

## [0.7.0] - 2022-07-09

### Added

- Opening counters

## [0.6.1] - 2022-06-26

### Fixed

- Popup is broken if no results are found

## [0.6.0] - 2022-06-26

### Added

- Pagination

### Changed

- Max results per page is 30 instead of 100
- All bookmarks are shown by default

## [0.5.0] - 2022-06-23

### Added

- Results per page

## [0.4.1] - 2022-06-19

### Fixed

- Nothing

## [0.4.0] - 2022-06-13

### Added

- Maximum count of history items
- Expiration time of history items

## [0.3.0] - 2022-05-29

### Added

- Extension home page (GitHub repo) is available through action context menu
- Two new action context menu items: history and frequency
- History page
- Frequency page
- Full history/frequency reset

### Changed

- "root" directory and associated flag are renamed to "custom"
- Options page title is specified

## [0.2.0] - 2022-05-17

### Added

- Search through whole "Bookmarks bar"

## [0.1.0] - 2022-04-26

### Added

- Configurable root directory
- Open new tab
- Update current tab

[Unreleased]: https://github.com/vikian050194/warp/compare/v1.21.0...HEAD
[1.21.0]: https://github.com/vikian050194/warp/compare/v1.20.0...v1.21.0
[1.20.0]: https://github.com/vikian050194/warp/compare/v1.19.0...v1.20.0
[1.19.0]: https://github.com/vikian050194/warp/compare/v1.18.0...v1.19.0
[1.18.0]: https://github.com/vikian050194/warp/compare/v1.17.0...v1.18.0
[1.17.0]: https://github.com/vikian050194/warp/compare/v1.16.1...v1.17.0
[1.16.1]: https://github.com/vikian050194/warp/compare/v1.16.0...v1.16.1
[1.16.0]: https://github.com/vikian050194/warp/compare/v1.15.1...v1.16.0
[1.15.1]: https://github.com/vikian050194/warp/compare/v1.15.0...v1.15.1
[1.15.0]: https://github.com/vikian050194/warp/compare/v1.14.0...v1.15.0
[1.14.0]: https://github.com/vikian050194/warp/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/vikian050194/warp/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/vikian050194/warp/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/vikian050194/warp/compare/v1.10.3...v1.11.0
[1.10.3]: https://github.com/vikian050194/warp/compare/v1.10.2...v1.10.3
[1.10.2]: https://github.com/vikian050194/warp/compare/v1.10.1...v1.10.2
[1.10.1]: https://github.com/vikian050194/warp/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/vikian050194/warp/compare/v1.9.3...v1.10.0
[1.9.3]: https://github.com/vikian050194/warp/compare/v1.9.2...v1.9.3
[1.9.2]: https://github.com/vikian050194/warp/compare/v1.9.1...v1.9.2
[1.9.1]: https://github.com/vikian050194/warp/compare/v1.9.0...v1.9.1
[1.9.0]: https://github.com/vikian050194/warp/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/vikian050194/warp/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/vikian050194/warp/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/vikian050194/warp/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/vikian050194/warp/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/vikian050194/warp/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/vikian050194/warp/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/vikian050194/warp/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/vikian050194/warp/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/vikian050194/warp/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/vikian050194/warp/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/vikian050194/warp/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/vikian050194/warp/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/vikian050194/warp/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/vikian050194/warp/compare/v0.10.0...v1.0.0
[0.10.0]: https://github.com/vikian050194/warp/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/vikian050194/warp/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/vikian050194/warp/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/vikian050194/warp/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/vikian050194/warp/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/vikian050194/warp/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/vikian050194/warp/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/vikian050194/warp/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/vikian050194/warp/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/vikian050194/warp/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/vikian050194/warp/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/vikian050194/warp/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/vikian050194/warp/releases/tag/v0.1.0
