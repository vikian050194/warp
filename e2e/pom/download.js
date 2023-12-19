import os from "os";

import { BasePOM, BasePage } from "./base.js";

class DownloadRow extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.source = page.locator("td").nth(0);
        this.json = page.locator("td").nth(1);
        this.csv = page.locator("td").nth(2);
        this.tsv = page.locator("td").nth(3);
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

export class DownloadPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.bookmarks = new DownloadRow(page.locator("tr").nth(1));
        this.history = new DownloadRow(page.locator("tr").nth(2));

        this.tmpDir = os.tmpdir();

        this.downloadPromise = null;
        this.download = null;
        this.data = null;
    }

    async goto() {
        await super.goto("download");
    }

    // TODO extract following two methods and re-use in all places
    zeroPad(num, places) {
        return String(num).padStart(places, "0");
    }

    zeroPad2(num) {
        return this.zeroPad(num, 2);
    }

    willWaitForData() {
        this.downloadPromise = this.page.waitForEvent("download");
    }

    async waitForData() {
        this.download = await this.downloadPromise;
        await this.download.saveAs(`${this.tmpDir}/` + this.download.suggestedFilename());
        const dataStream = await this.download.createReadStream();
        const dataChunks = await dataStream.toArray();
        this.data = dataChunks.join();
    }

    async jsonHasItems(expected) {
        const jsonData = JSON.parse(this.data);
        await this.expect(jsonData.length).toBe(expected);
    }

    async csvHasRows(expected) {
        const csvData = this.data.split("\n");
        await this.expect(csvData.length).toBe(expected + 1);
    }

    async tsvHasRows(expected) {
        const tsvData = this.data.split("\n");
        await this.expect(tsvData.length).toBe(expected + 1);
    }

    async hasName(source, type) {
        const now = new Date();
        const ymd = `${now.getFullYear()}-${this.zeroPad2(now.getMonth() + 1)}-${this.zeroPad2(now.getDate())}`;
        const mask = `warp-${source}-${ymd}.${type}`;
        await this.expect(this.download.suggestedFilename()).toBe(mask);
    }

    async jsonHasName(source) {
        await this.hasName(source, "json");
    }

    async csvHasName(source) {
        await this.hasName(source, "csv");
    }

    async tsvHasName(source) {
        await this.hasName(source, "tsv");
    }
}
