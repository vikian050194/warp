import { expect } from "../fixtures.js";

export class BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.expect = expect;
    }
}

export class TextOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locator = page;
    }

    async hasValue(value) {
        await this.expect(this.locator).toContainText(value);
    }
}

export class ButtonAction extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locator = page.locator("input");
    }

    async click() {
        await this.locator.click();
    }

    async hasValue(value) {
        await this.expect(this.locator).toHaveValue(value);
    }
}

class Navigation extends BasePOM {
    /**
 * @param {import('@playwright/test').Page} page
 */
    constructor(page) {
        super(page);

        const container = page.locator("footer > div");

        this.options = container.locator("span", { hasText: "options" });
        this.history = container.locator("span", { hasText: "history" });
        this.frequency = container.locator("span", { hasText: "frequency" });
        this.counters = container.locator("span", { hasText: "counters" });
        this.download = container.locator("span", { hasText: "download" });
        this.changelog = container.locator("span", { hasText: "changelog" });
        this.help = container.locator("span", { hasText: "help" });
    }
}

export class BasePage extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page);

        this.extensionId = extensionId;
        this.navigation = new Navigation(page);
        this.version = page.locator("#version");
    }

    async goto(name, params = {}) {
        let q = "";
        for (const key in params) {
            const value = params[key];
            if (value !== null) {
                q += `${key}=${value}`;
            }
        }
        await this.page.goto(`chrome-extension://${this.extensionId}/${name}/${name}.html${q ? "?" + q : ""}`);
    }

    async reload() {
        await this.page.reload();
    }

    async close() {
        await this.page.close();
    }

    async checkVersion() {
        const text = await this.version.textContent();
        await this.expect(text).toMatch(/^v1\.\d+\.\d$/);
    }
}
