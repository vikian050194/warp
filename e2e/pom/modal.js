import { BasePOM } from "./base.js";

export class ModalPopup extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.modal = page.locator("#modal-one");
        this.title = this.modal.locator("h1");
        this.description = this.modal.locator("div.description");
        this.background = this.modal.locator("div.modal-bg.modal-exit");
        this.closeButton = this.modal.locator("button.modal-close.modal-exit");
    }

    async visible() {
        await this.expect(this.modal).toBeVisible();
    }

    async hidden() {
        await this.expect(this.modal).toBeHidden();
    }

    async exit() {
        await this.background.click({ position: { x: 0, y: 0} });
    }

    async close() {
        await this.closeButton.click();
    }

    async hasTitle() {
        const value = await this.title.innerText;
        await this.expect(value.length).toBeGreaterThan(0);
    }

    async hasDescription() {
        const value = await this.description.innerText;
        await this.expect(value.length).toBeGreaterThan(0);
    }
}