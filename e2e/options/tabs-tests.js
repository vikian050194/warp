import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Tabs", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    const COUNT = 6;

    test("Pins", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);
        let index = 1;

        // Assert
        await expect(pom.getPin(index++)).toHaveText("Bookmarks");
        await expect(pom.getPin(index++)).toHaveText("History");
        await expect(pom.getPin(index++)).toHaveText("Results");
        await expect(pom.getPin(index++)).toHaveText("Appearance");
        await expect(pom.getPin(index++)).toHaveText("Tabs");
        await expect(pom.getPin(index++)).toHaveText("Autoclose");
    });

    test("Tabs", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);
        let index = 1;

        // Assert
        await expect(pom.getTab(index++).locator("h2")).toHaveText("Bookmarks");
        await expect(pom.getTab(index++).locator("h2")).toHaveText("History");
        await expect(pom.getTab(index++).locator("h2")).toHaveText("Results");
        await expect(pom.getTab(index++).locator("h2")).toHaveText("Appearance");
        await expect(pom.getTab(index++).locator("h2")).toHaveText("Tabs");
        await expect(pom.getTab(index++).locator("h2")).toHaveText("Autoclose");

        for (let i = 1; i <= COUNT; i++) {
            if (i === 1) {
                await expect(pom.getTab(i)).toBeVisible();
            } else {
                await expect(pom.getTab(i)).toBeHidden();
            }
        }
    });

    test("Tabs visibility", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        // Assert
        for (let i = 1; i <= COUNT; i++) {
            await pom.getPin(i).click();
            for (let j = 1; j <= COUNT; j++) {
                if (i === j) {
                    await expect(pom.getTab(j)).toBeVisible();
                } else {
                    await expect(pom.getTab(j)).toBeHidden();
                }
            }
        }
    });

    test("Titles and descriptions", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        // Assert
        for (let i = 1; i <= COUNT; i++) {
            await pom.getPin(i).click();

            const titles = await pom.getTab(i).locator("span.title").allInnerTexts();
            for (const title of titles) {
                await expect(title.length).toBeGreaterThan(0);
            }

            const icons = await pom.getTab(i).locator("span.info").allInnerTexts();
            for (const icon of icons) {
                await expect(icon.length).toBe(5);
            }
        }
    });

    test("Descriptions in modal popup", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        const modal = pom.modal;
        await modal.hidden();

        // Assert
        for (let i = 1; i <= COUNT; i++) {
            await pom.getPin(i).click();

            const icons = await pom.getTab(i).locator("span.info").all();
            for (const icon of icons) {
                await icon.click();
                await modal.visible();
                await modal.hasTitle();
                await modal.hasDescription();
                await modal.close();
                await modal.hidden();

                await icon.click();
                await modal.visible();
                await modal.exit();
                await modal.hidden();
            }
        }
    });
});