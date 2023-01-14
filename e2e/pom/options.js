import { BasePage } from "./base.js";

export class OptionsPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(extensionId, page) {
        super(extensionId, page);

        this.saveButton = page.locator("#save");
    }
  
    async goto() {
        await super.goto("options");
    }

    async save() {
        await this.saveButton.click();
    }
}
