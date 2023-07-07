import { BasePage, BasePOM, TextOption, ButtonAction } from "./base.js";

class FrequencyRow extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.index = new TextOption(page.locator("td").nth(0));
        this.count = new TextOption(page.locator("td").nth(1));
        this.name = new TextOption(page.locator("td").nth(2));
        this.delete = new ButtonAction(page.locator("td").nth(3));
    }

    async isValidIndex(expected) {
        await this.count.hasValue(`${expected}`);
    }

    async isValidCount(expected) {
        await this.count.hasValue(`${expected}`);
    }

    async isValidName(expected) {
        await this.name.hasValue(expected);
    }
}

export class FrequencyPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.resetButton = page.locator("#reset");
        this.message = page.locator("div.message");
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

    getRowPom(index) {
        const row = this.page.locator("tr").nth(index);
        const rowPom = new FrequencyRow(row);
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
