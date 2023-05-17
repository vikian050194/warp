import { BasePage } from "./base.js";

export class HistoryPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.resetButton = page.locator("#reset");
        this.message = page.locator("div.message");
    }

    async goto() {
        await super.goto("history");
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
        const text = await row.textContent();
        const iso = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
        await this.expect(text).toMatch(new RegExp(`${count - index + 1}${iso.source}${name}`));
    }

    async isMessageVisible(visible = true) {
        if (visible) {
            await this.message.isVisible();
        } else {
            await this.message.isHidden();
        }
    }
}
