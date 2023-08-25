import { test, expect, timeout } from "../fixtures.js";
import {
    HistoryPage
} from "../pom/index.js";

test.describe("Navigation", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new HistoryPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        // TODO extract header locator
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("History");
    });

    test("Options", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Act
        await pom.navigation.options.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("History", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Act
        await pom.navigation.history.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("history/history.html"));
    });

    test("Frequency", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Act
        await pom.navigation.frequency.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("frequency/frequency.html"));
    });

    test("Counters", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Act
        await pom.navigation.counters.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("counters/counters.html"));
    });

    test("Changelog", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Act
        await pom.navigation.changelog.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("changelog/changelog.html"));
    });

    test("Version", async ({ page }) => {
        // Arrange
        const pom = new HistoryPage(page);

        // Assert
        await pom.checkVersion();
    });
});