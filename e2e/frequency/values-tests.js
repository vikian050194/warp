import { test, timeout } from "../fixtures.js";
import {
    FrequencyPage,
    PopupPage,
    BookmarksPage
} from "../pom/index.js";

test.describe("Values", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

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
        const row = await pom.getRowPom(1);
        await row.isValidIndex(1);
        await row.isValidCount(1);
        await row.isValidName("Warp:Example Domain");
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
        const row1 = await pom.getRowPom(1);
        await row1.isValidIndex(2);
        await row1.isValidCount(2);
        await row1.isValidName("Warp:Example Domain");

        const row2 = await pom.getRowPom(2);
        await row2.isValidIndex(1);
        await row2.isValidCount(1);
        await row2.isValidName("Warp/Chrome:Extensions");
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
        const row1 = await pom.getRowPom(1);
        await row1.isValidIndex(2);
        await row1.isValidCount(2);
        await row1.isValidName("<NOT FOUND BOOKMARK #43>");

        const row2 = await pom.getRowPom(2);
        await row2.isValidIndex(1);
        await row2.isValidCount(1);
        await row2.isValidName("Warp/Chrome:Extensions");
    });
});