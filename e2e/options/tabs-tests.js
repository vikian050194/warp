import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Tabs", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test("Pins", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        // Assert
        await expect(pom.getPin(1)).toHaveText("Bookmarks");
        await expect(pom.getPin(2)).toHaveText("History");
        await expect(pom.getPin(3)).toHaveText("Results");
        await expect(pom.getPin(4)).toHaveText("Appearance");
        await expect(pom.getPin(5)).toHaveText("Tabs");
        await expect(pom.getPin(6)).toHaveText("Autoclose");
    });

    test("Tabs", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        // Assert
        await expect(pom.getTab(1).locator("h2")).toHaveText("Bookmarks");
        await expect(pom.getTab(2).locator("h2")).toHaveText("History");
        await expect(pom.getTab(3).locator("h2")).toHaveText("Results");
        await expect(pom.getTab(4).locator("h2")).toHaveText("Appearance");
        await expect(pom.getTab(5).locator("h2")).toHaveText("Tabs");
        await expect(pom.getTab(6).locator("h2")).toHaveText("Autoclose");

        for (let i = 1; i <= 6; i++) {
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
        for (let i = 1; i <= 6; i++) {
            await pom.getPin(i).click();
            for (let j = 1; j <= 6; j++) {
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
        for (let i = 1; i <= 6; i++) {
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
        for (let i = 1; i <= 6; i++) {
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