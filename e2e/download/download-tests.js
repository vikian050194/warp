import { test, timeout } from "../fixtures.js";
import { DownloadPage } from "../pom/index.js";

test.describe("Download", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new DownloadPage(page, extensionId);
        await pom.goto();
    });

    test.describe("bookmarks", () => {
        test("JSON", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.bookmarks.json.click();

            // Assert
            await pom.waitForData();
            await pom.jsonHasName("bookmarks");
            await pom.jsonHasItems(33);
        });

        test("CSV", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.bookmarks.csv.click();

            // Assert
            await pom.waitForData();
            await pom.csvHasName("bookmarks");
            await pom.csvHasRows(33);
        });

        test("TSV", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.bookmarks.tsv.click();

            // Assert
            await pom.waitForData();
            await pom.tsvHasName("bookmarks");
            await pom.tsvHasRows(33);
        });
    });

    test.describe("history", () => {
        test("JSON", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.history.json.click();

            // Assert
            await pom.waitForData();
            await pom.jsonHasName("history");
            await pom.jsonHasItems(0);
        });

        test("CSV", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.history.csv.click();

            // Assert
            await pom.waitForData();
            await pom.csvHasName("history");
            await pom.csvHasRows(0);
        });

        test("TSV", async ({ page, extensionId }) => {
            // Arrange
            const pom = new DownloadPage(page, extensionId);
            pom.willWaitForData();

            // Act
            await pom.history.tsv.click();

            // Assert
            await pom.waitForData();
            await pom.tsvHasName("history");
            await pom.tsvHasRows(0);
        });
    });
});