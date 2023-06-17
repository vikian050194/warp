import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Query", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(4).click();
        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test("Empty", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Assert
        await expect(pom.query).toHaveText("");
    });

    test("One word", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("maps");

        // Assert
        await expect(pom.query).toHaveText("maps");
    });

    test("Two words", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("maps cz");

        // Assert
        await expect(pom.query).toHaveText("maps cz");
    });

    test("Clean", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("maps");
        for (let index = 0; index < 4; index++) {
            await pom.backspace();
        }

        // Assert
        await expect(pom.query).toHaveText("");
    });
});