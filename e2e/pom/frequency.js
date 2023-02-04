import { BasePage } from "./base.js";

export class FrequencyPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.resetButton = page.locator("#reset");
    }

    async goto() {
        await super.goto("frequency");
    }

    async reset() {
        await this.resetButton.click();
    }

    async empty() {
        const row = this.page.locator("tbody tr");
        await this.expect(row).toHaveCount(0);
    }

    async row(index, count, name) {
        const row = this.page.locator("tr").nth(index);
        await this.expect(row).toHaveText(`${index}${count}${name}`);
    }
}
