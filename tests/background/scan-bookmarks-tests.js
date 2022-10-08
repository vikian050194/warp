import assert from "node:assert";

import { getBookmarksList } from "../../src/background/scan.js";
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

describe("scan bookmarks", function () {
    it("undefined root", async () => {
        const root = undefined;
        const bookmarks = {};
        mockChromeApi(bookmarks);

        const expected = [];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("no bookmarks", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: []
        };
        mockChromeApi(bookmarks);

        const expected = [];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("zero level", async () => {
        const root = new ChromeBookmark(1, "root");
        const bookmarks = {
            1: [
                new ChromeBookmark("2", "bm", "url2")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel("2", "url2", "bm", [])
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("first level", async () => {
        const root = new ChromeBookmark("1", "root");
        const bookmarks = {
            1: [
                new ChromeBookmark("2", "sub2")
            ],
            2: [
                new ChromeBookmark("3", "bm", "url3")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel("3", "url3", "bm", ["sub2"])
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });

    it("second level", async () => {
        const root = new ChromeBookmark("1", "root");
        const bookmarks = {
            1: [
                new ChromeBookmark("2", "sub2")
            ],
            2: [
                new ChromeBookmark("3", "sub3")
            ],
            3: [
                new ChromeBookmark("4", "bm", "url4")
            ]
        };
        mockChromeApi(bookmarks);

        const expected = [
            new BookmarkModel("4", "url4", "bm", ["sub2", "sub3"])
        ];

        const actual = await getBookmarksList(root);

        assert.deepEqual(actual, expected);
    });
});
