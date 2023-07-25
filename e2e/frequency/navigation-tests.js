import { test, expect, timeout } from "../fixtures.js";
import {
    FrequencyPage
} from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new FrequencyPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("Frequency");
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

    test("Changelog", async ({ page }) => {
        // Arrange
        const link = page.locator("footer > span", { hasText: "changelog" });

        // Act
        await link.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("changelog/changelog.html"));
    });
});