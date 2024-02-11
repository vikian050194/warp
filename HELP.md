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

Search process has 8 steps. Each one has different priority or "weight". Each time all of them are applied one by one. Ascending priority order:

1. Case sensitive bookmark name beginning matching;
2. Case insensitive bookmark name beginning matching;
3. Case sensitive folder beginning matching;
4. Case insensitive folder beginning matching;
5. Case sensitive full bookmark path including name splitted by whitespace to splitted by whitespace query matching;
6. Case insensitive full bookmark path including name splitted by whitespace to splitted by whitespace query matching;
7. Case sensitive abbreviation mathing;
8. Case insensitive abbreviation mathing.

In some cases that is not so straightforward it make sense to take time to think about best way (best query that is easy to type in other words) to get required bookmark as high as possible in results list.

### Examples

There are not full list of examples, but most complex:

5. "lo r ad" matches "logs/rc/admin service";
6. The same as previous, but "r" part may stands for "rc", "RC" or even "Rc";
7. "lra" matches "logs/rc/admin service" - just like 5th does.

## Results ordering

Results order depends on selected sorting algorithm.
Different algorithms provides best result in different workflows.
Try all of them to select best option for you.
