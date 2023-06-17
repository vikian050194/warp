import { test, expect, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("header > h1");

        // Assert
        await expect(header).toHaveText("Options");
    });

    test("Options", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "options" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("History", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "history" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("history/history.html"));
    });

    test("Frequency", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "frequency" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("frequency/frequency.html"));
    });

    test("Counters", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "counters" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("counters/counters.html"));
    });
});