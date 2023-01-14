import { expect } from "../fixtures.js";

export class BookmarksPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.expect = expect;
        this.query = page.locator("#searchInput");
        this.dots = page.locator("bookmarks-list iron-list bookmarks-item div[id='maskedImage']");
        this.delete = page.locator("cr-action-menu > button:nth-child(5)");
    }

    async goto() {
        await this.page.goto("chrome://bookmarks/");
    }

    async search(query) {
        await this.query.type(query);
    }

    async removeFirstResult() {
        await this.dots.click();
        await this.delete.click();
    }
}
