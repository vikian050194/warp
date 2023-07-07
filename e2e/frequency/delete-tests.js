import { test, timeout } from "../fixtures.js";
import {
    FrequencyPage,
    PopupPage,
    BookmarksPage
} from "../pom/index.js";

test.describe("Delete", () => {
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

        const row = await pom.getRowPom(1);
        row.delete.click();

        // Assert
        await pom.empty();
        await pom.isMessageVisible(true);
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

        const row = await pom.getRowPom(1);
        row.delete.click();

        // Assert
        const row1 = await pom.getRowPom(1);
        await row1.isValidIndex(1);
        await row1.isValidCount(1);
        await row1.isValidName("Warp/Chrome:Extensions");
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

        const row = await pom.getRowPom(1);
        row.delete.click();

        // Assert
        const row1 = await pom.getRowPom(1);
        await row1.isValidIndex(1);
        await row1.isValidCount(1);
        await row1.isValidName("Warp/Chrome:Extensions");
    });
});