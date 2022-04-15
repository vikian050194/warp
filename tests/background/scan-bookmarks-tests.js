import assert from "assert";

import { getBookmarksList } from "../../src/background/foo.js";
import { BookmarkModel } from "../../src/common/index.js";

const mockChromeApi = (bookmarks) => {
    global.chrome = {};
    global.chrome.bookmarks = {};
    global.chrome.bookmarks.getChildren = (id) => Promise.resolve(bookmarks[id]);
};

class ChromeBookmark {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}

describe("Scan bookmarks", function () {
    it("Undefined root", async () => {
        const root = undefined;
        const bookmarks = {};
        mockChromeApi(bookmarks);

        const expected = [];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("No bookmarks", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: []
        };
        mockChromeApi(bookmarks);

        const expected = [];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("Zero level", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: [
                new ChromeBookmark(2, "bm", "url2")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel([], "bm", "url2")
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("First level", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: [
                new ChromeBookmark(2, "sub2")
            ],
            2: [
                new ChromeBookmark(3, "bm", "url3")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel(["sub2"], "bm", "url3")
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("Second level", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: [
                new ChromeBookmark(2, "sub2")
            ],
            2: [
                new ChromeBookmark(3, "sub3")
            ],
            3: [
                new ChromeBookmark(4, "bm", "url4")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel(["sub2", "sub3"], "bm", "url4")
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });
});
