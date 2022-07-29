## List of questions and problems that I faced during development

1. **Without a mouse**

   Q: *Is it possible to open bookmark without mouse?*

   A: Yes, it's possible. `Ctrl+Shift+O`, type something, a lot of `Tab`'s and that's it!

2. **Efficiency**

   Q: *Is it possible to do it in a more efficient way?*

   A: There are a lot of extensions in the marketplace, but none of them can do it. At least it is not obvious from description.

3. **Bycicle**

   Q: *Can I write my Google Chrome extension?*

   A: Yeah, no problems.

4. **Glory**

   Q: *Can I publish it?*

   A: Register as a dev and pay 10$.

5. **Perfomance**

   Q: *Can I scan bookmarks only on change?*

   A: Yes, it's possible. Just move code to `service worker`.

6. **Modules**

   Q: *Can I reuse my code without `webpack`?*

   A: Yeah, it is necessary to set `service worker` type to `module`. The same is working for `popup` and `options`.

7. **Storage**

   Q: *Where can I store model?*

   A: Use `chrome.storage.*`.

8. **Sugar**

   Q: *Can I use `async/await` or call callback as simple as possible to return value from background to popup?*

   A: Unfortunately, no, because of [bug in GC](https://crbug.com/1304272).

9. **Limits**

   Q: *Is there a limit for values in `sync` storage?*

   A: Yes, it is 8,192 bytes. Use `local` because it has greater limit - 5,242,880 bytes. Or even grant `unlimitedStorage` permission.

10. **Quality**

    Q: *Can I use `nyc` for code coverage?*

    A: No, use `c8` instead of `nyc`, hint is [here](https://stackoverflow.com/a/69846825).

11. **Close**

    Q: *Can I close popup from JS?*

    A: Yes, just call `window.close()`.

12. **Index**

    Q: *How can I find last index of element in array?*

    A: `findLastIndex` is not implemented in `Node.js` - tests are not working without `babel`
