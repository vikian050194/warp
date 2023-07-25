import { test, timeout } from "../fixtures.js";
import {
    FrequencyPage,
    PopupPage
} from "../pom/index.js";

test.describe("Reset", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new FrequencyPage(page, extensionId);
        await pom.goto();
    });

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