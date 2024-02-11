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
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.options.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("History", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.history.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("history/history.html"));
    });

    test("Frequency", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.frequency.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("frequency/frequency.html"));
    });

    test("Counters", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.counters.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("counters/counters.html"));
    });

    test("Download", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.download.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("download/download.html"));
    });

    test("Changelog", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.changelog.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("changelog/changelog.html"));
    });

    test("Help", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Act
        await pom.navigation.help.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("help/help.html"));
    });

    test("Version", async ({ page }) => {
        // Arrange
        const pom = new FrequencyPage(page);

        // Assert
        await pom.checkVersion();
    });
});