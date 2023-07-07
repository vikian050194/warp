import { BasePage, BasePOM, TextOption, ButtonAction } from "./base.js";

class HistoryRow extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.index = new TextOption(page.locator("td").nth(0));
        this.date = new TextOption(page.locator("td").nth(1));
        this.name = new TextOption(page.locator("td").nth(2));
        this.delete = new ButtonAction(page.locator("td").nth(3));
    }

    async isValidIndex(count, index) {
        await this.index.hasValue(`${count - index + 1}`);
    }

    async isValidDate() {
        const iso = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
        await this.date.hasValue(iso);
    }

    async isValidName(expected) {
        await this.name.hasValue(expected);
    }
}

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

    getRowPom(index) {
        const row = this.page.locator("tr").nth(index);
        const rowPom = new HistoryRow(row);
        return rowPom;
    }

    async isMessageVisible(visible = true) {
        if (visible) {
            await this.message.isVisible();
        } else {
            await this.message.isHidden();
        }
    }
}
