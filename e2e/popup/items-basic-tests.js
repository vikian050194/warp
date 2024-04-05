import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Items - basic", () => {
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

    test("Arrow is visible", async ({ page, extensionId }) => {
        // Arrange
        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.getPin(5).click();
        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        // Assert
        await expect(pom.selected).toHaveText("➤Warp/Chat:Discord");
        await expect(pom.nth(0)).toHaveText("➤Warp/Chat:Discord");
    });

    test("Up for down", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.up();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Google:Drive");
        await expect(pom.nth(9)).toHaveText("Warp/Google:Drive");

        for (let index = 0; index < 9; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Up for nothing", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.getPin(4).click();
        await options.results.looping.click();
        await options.save();
        await options.close();

        const pom = new PopupPage(page, extensionId);
        await pom.reload();

        // Act
        await pom.up();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Chat:Discord");
        await expect(pom.nth(0)).toHaveText("Warp/Chat:Discord");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Down for second item", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.down();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Chat:Skype");
        await expect(pom.nth(1)).toHaveText("Warp/Chat:Skype");

        for (let index = 0; index < 10; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Down for up", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        for (let index = 0; index < 9; index++) {
            await pom.down();
        }

        await pom.down();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Chat:Discord");
        await expect(pom.nth(0)).toHaveText("Warp/Chat:Discord");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });

    test("Down for nothing", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.getPin(4).click();
        await options.results.looping.click();
        await options.save();
        await options.close();

        const pom = new PopupPage(page, extensionId);
        await pom.reload();

        // Act
        for (let index = 0; index < 9; index++) {
            await pom.down();
        }

        await pom.down();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Google:Drive");
        await expect(pom.nth(9)).toHaveText("Warp/Google:Drive");

        for (let index = 0; index < 9; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).not.toHaveText("...");
        }
    });
});