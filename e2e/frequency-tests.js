import { test, expect } from "./fixtures.js";
import {
    FrequencyPage,
    PopupPage,
    BookmarksPage
} from "./pom/index.js";

test.describe("Frequency", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(2000);

        const pom = new FrequencyPage(page, extensionId);
        await pom.goto();
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("Frequency");
    });

    test.describe("Navigation", () => {
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

    test.describe("Values", () => {
        test("Single opening", async ({ page, extensionId, context }) => {
            // Arrange
            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            const pom = new FrequencyPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.row(1, 1, "Warp:Example Domain");
        });

        test("Two and one", async ({ page, extensionId, context }) => {
            // Arrange
            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            const pom = new FrequencyPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.row(1, 2, "Warp:Example Domain");
            await pom.row(2, 1, "Warp/Chrome:Extensions");
        });

        test("Removed bookmark", async ({ page, extensionId, context }) => {
            // Arrange
            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("extensions");
            await popup.enter();

            page = await context.newPage();
            popup.page = page;
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            const bookmarks = new BookmarksPage(page);
            await bookmarks.goto();
            await bookmarks.search("example");
            await page.waitForTimeout(1000);
            await bookmarks.removeFirstResult();
            await page.waitForTimeout(1000);

            page = await context.newPage();
            const pom = new FrequencyPage(page, extensionId);
            await pom.goto();

            // Assert
            await pom.row(1, 2, "<NOT FOUND BOOKMARK #43>");
            await pom.row(2, 1, "Warp/Chrome:Extensions");
        });
    });

    test.describe("Reset", () => {
        test("No data", async ({ page, extensionId }) => {
            // Arrange
            const pom = new FrequencyPage(page, extensionId);

            // Act
            await pom.goto();

            await pom.isMessageVisible(true);

            await pom.reset();

            // Assert
            await pom.empty();
            await pom.isMessageVisible(true);
        });

        test("Single row", async ({ page, extensionId, context }) => {
            // Arrange
            const popup = new PopupPage(page, extensionId);

            // Act
            await popup.goto();
            await popup.search("example");
            await popup.enter();

            page = await context.newPage();
            const pom = new FrequencyPage(page, extensionId);
            await pom.goto();
   
            await pom.isMessageVisible(false);

            await pom.reset();

            // Assert
            await pom.empty();
            await pom.isMessageVisible(true);
        });
    });
});