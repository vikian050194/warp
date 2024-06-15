import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Search", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(5).click();
        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("Case sensitive", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(3).click();
        await options.search.isCaseSensitive.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("youtube");

        // Assert
        await expect(pom.selected).toBeHidden();

        for (let index = 0; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Starts with - nothing", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(3).click();
        await options.search.isCaseSensitive.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("outub");

        // Assert
        await expect(pom.selected).toBeHidden();

        for (let index = 0; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Contains - one item", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(3).click();
        await options.search.isStartsWith.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("uTu");

        // Assert
        await expect(pom.selected).toHaveText("Warp/Google:YouTube");
        await expect(pom.nth(0)).toHaveText("Warp/Google:YouTube");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });
});