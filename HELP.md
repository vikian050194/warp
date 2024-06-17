# Help

## Changelog

Do not forget to examine [changelog](../changelog/changelog.html) to know about all and latest features.

## Activation

Pin extension to reduce opening time.

Configure activation shortcut. Go to [chrome://extensions/shortcuts](chrome://extensions/shortcuts) - please copy-paste this link because it is not clickable because of security restrictions. It make more sense if you are working on Mac OS because default shortcut matches to default browser shortcut to close tab. Or if you just want to customise it.

## Actions

Default action on "Enter" is current active tab updateing. You can press additional "Shift" to open new tab.

If you want to switch two actions please go to extension [options](../options/options.html), "Tabs" sub-section, "Additional action" checkbox - uncheck it.

To be sure what is your preferable workflow you can just take a look at [counters](../counters/counters.html), "Opening" sub-section after a while. Probably it's a good idea to use "more popular" flow for shortest keys combination - "Enter".

## Search

Some understanding of searching process internals is required to build efficient queries.

### Steps

Search process has 4 steps (or algorithms). Algorithms are applied one by one. Each one has different priority or "weight". Ascending priority order:

1. Bookmark name matching;
2. Directory name matching;
3. Full bookmark path including name splitted by whitespace to splitted by whitespace query matching;
4. Abbreviation mathing;

Last two algorithms are heavy - you can disable it if you are not using it to improve searching performance at least as temporary solution before bookmarks reorganising and renaming.
Case sensitivity (that is in use) is configurable. In some cases that is not so straightforward it make sense to take time to think about best way (best query that is easy to type in other words) to get required bookmark as high as possible in results list.
Sub-searching algorithm can be "starts with" or "contains" - it's also configurable.

### Examples

To find "logs/rc/admin service" via each algorithm:

1. "ad";
2. "rc";
3. "lo r ad";
4. "lra".

## Results ordering

Results order depends on selected sorting algorithm.
Different algorithms provides best result in different workflows.
Try all of them to select best option for you.
