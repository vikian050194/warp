import { BasePage } from "./base.js";

export class CountersPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(extensionId, page) {
        super(extensionId, page);

        this.resetButton = page.locator("#reset");
    }

    async goto() {
        await super.goto("counters");
    }

    async reset() {
        await this.resetButton.click();
    }

    async since() {
        const cell = this.page.locator("table tbody tr td").nth(1);
        const text = await cell.textContent();
        const now = new Date();
        const iso = /T[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
        const mask = `${now.getFullYear()}-${this.zeroPad2(now.getMonth() + 1)}-${this.zeroPad2(now.getDate())}${iso.source}`;
        await this.expect(text).toMatch(new RegExp(mask));
    }

    async total(n) {
        const cell = this.page.locator("table").nth(1).locator("tbody tr").nth(0).locator("td").nth(1);
        await this.expect(cell).toHaveText(n.toString());
    }

    async update(n, p) {
        const cell = this.page.locator("table").nth(1).locator("tbody tr").nth(1).locator("td").nth(1);
        await this.expect(cell).toHaveText(`${n} (${p.toFixed(2)}%)`);
    }

    async create(n, p) {
        const cell = this.page.locator("table").nth(1).locator("tbody tr").nth(2).locator("td").nth(1);
        await this.expect(cell).toHaveText(`${n} (${p.toFixed(2)}%)`);
    }

    zeroPad(num, places) {
        return String(num).padStart(places, "0");
    }

    zeroPad2(num) {
        return this.zeroPad(num, 2);
    }
}
