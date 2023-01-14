import { expect } from "../fixtures.js";

export class BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(extensionId, page) {
        this.extensionId = extensionId;
        this.page = page;

        this.expect = expect;
    }

    async goto(name) {
        await this.page.goto(`chrome-extension://${this.extensionId}/${name}/${name}.html`);
    }
}
