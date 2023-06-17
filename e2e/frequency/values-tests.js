import { test, timeout } from "../fixtures.js";
import {
    FrequencyPage,
    PopupPage,
    BookmarksPage
} from "../pom/index.js";

test.describe("Values", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(timeout * 2);

        const pom = new FrequencyPage(page, extensionId);
        await pom.goto();
    });

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
        await page.waitForTimeout(timeout);
        await bookmarks.removeFirstResult();
        await page.waitForTimeout(timeout);

        page = await context.newPage();
        const pom = new FrequencyPage(page, extensionId);
        await pom.goto();

        // Assert
        await pom.row(1, 2, "<NOT FOUND BOOKMARK #43>");
        await pom.row(2, 1, "Warp/Chrome:Extensions");
    });
});