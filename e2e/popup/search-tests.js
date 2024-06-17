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

        await options.clickAppearancePin();
        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();
    });

    test("Case sensitive", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.clickSearchPin();
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

        await options.clickSearchPin();
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

        await options.clickSearchPin();
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

    test("Split - on - one result", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("ex do");

        // Assert
        await expect(pom.selected).toHaveText("Warp:Example Domain");
        await expect(pom.nth(0)).toHaveText("Warp:Example Domain");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Split - off - no results", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.clickSearchPin();
        await options.search.splitSearch.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("ex do");

        // Assert
        await expect(pom.selected).toBeHidden();

        for (let index = 0; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Abbreviation - on - one result", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("ed");

        // Assert
        await expect(pom.selected).toHaveText("Warp:Example Domain");
        await expect(pom.nth(0)).toHaveText("Warp:Example Domain");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Abbreviation - off - no results", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.clickSearchPin();
        await options.search.abbreviationSearch.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Act
        await pom.search("ed");

        // Assert
        await expect(pom.selected).toBeHidden();

        for (let index = 0; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });
});