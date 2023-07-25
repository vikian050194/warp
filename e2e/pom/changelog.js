import { BasePage } from "./base.js";
import { ModalPopup } from "./modal.js";

export class ChangelogPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.modal = new ModalPopup(page);
    }

    async goto(reason = null) {
        await super.goto("changelog", { reason });
    }
}
