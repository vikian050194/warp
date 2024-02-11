import { test, expect, timeout } from "../fixtures.js";
import { HelpPage } from "../pom/index.js";

test.describe("Misc", () => {
    test.beforeEach(async ({ page, context }) => {
        await page.waitForTimeout(timeout * 2);

        await context.pages()[0].close();
    });

    test("Header", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const header = page.locator("header > h1");

        // Assert
        await expect(header).toHaveText("Help");
    });

    test("Options", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.options.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("options/options.html"));
    });

    test("History", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.history.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("history/history.html"));
    });

    test("Frequency", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.frequency.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("frequency/frequency.html"));
    });

    test("Counters", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.counters.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("counters/counters.html"));
    });

    test("Download", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.download.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("download/download.html"));
    });

    test("Changelog", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.changelog.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("changelog/changelog.html"));
    });

    test("Help", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Act
        await pom.navigation.help.click();

        // Assert
        await expect(page).toHaveURL(new RegExp("help/help.html"));
    });

    test("Version", async ({ context }) => {
        // Arrange
        const page = context.pages()[1];
        const pom = new HelpPage(page);

        // Assert
        await pom.checkVersion();
    });
});