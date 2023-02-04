import { BasePage } from "./base.js";

export class PopupPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.query = page.locator("#query");
        this.back = page.locator("#back");
        this.pager = page.locator("#pager");
        this.next = page.locator("#next");
        this.selected = page.locator("#options > div.selected");
        this.nth = (n) => page.locator(`#opt-${n}`);
    }

    async goto() {
        await super.goto("popup");
    }

    async search(query) {
        await this.page.type("body", query);
    }

    async press(button) {
        await this.page.keyboard.press(button);
    }

    async enter() {
        await this.press("Enter");
    }

    async shiftEnter() {
        await this.press("Shift+Enter");
    }

    async controlShiftEnter() {
        await this.press("Shift+Control+Enter");
    }

    async backspace() {
        await this.press("Backspace");
    }

    async up() {
        await this.press("ArrowUp");
    }

    async down() {
        await this.press("ArrowDown");
    }

    async right() {
        await this.press("ArrowRight");
    }

    async left() {
        await this.press("ArrowLeft");
    }
}
