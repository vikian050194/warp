import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Paging", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(4).click();
        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("Initial page", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Assert
        await expect(pom.back).not.toHaveClass("arrow active");
        await expect(pom.pager).toHaveText("1/4");
        await expect(pom.next).toHaveClass("arrow active");
    });

    test("Middle page", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.right();

        // Assert
        await expect(pom.back).toHaveClass("arrow active");
        await expect(pom.pager).toHaveText("2/4");
        await expect(pom.next).toHaveClass("arrow active");
    });

    test("Last page", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        for (let index = 0; index < 3; index++) {
            await pom.right();
        }

        // Assert
        await expect(pom.back).toHaveClass("arrow active");
        await expect(pom.pager).toHaveText("4/4");
        await expect(pom.next).toHaveClass("arrow");
    });

    test("Single page", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await page.press("body", "t");

        // Assert
        await expect(pom.back).toHaveClass("arrow");
        await expect(pom.pager).toHaveText("1/1");
        await expect(pom.next).toHaveClass("arrow");
    });

    test("Go back", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.right();
        await pom.left();

        // Assert
        await expect(pom.back).toHaveClass("arrow");
        await expect(pom.pager).toHaveText("1/4");
        await expect(pom.next).toHaveClass("arrow active");
    });
});