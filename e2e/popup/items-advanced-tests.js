import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Items - advanced", () => {
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

    test("Adjust on real list updating (first item)", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("f");
        await pom.down();
        await pom.press("l");

        // Assert
        await expect(pom.selected).toHaveText("Warp/Chrome:Flags");
        await expect(pom.nth(0)).toHaveText("Warp/Chrome:Flags");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
            await expect(pom.nth(index)).toHaveText("...");
        }
    });

    test("Adjust on real list update (second item)", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("g m");
        await pom.down();
        await pom.down();
        await pom.press("a");

        // Assert
        await expect(pom.selected).toHaveText("Warp/Google:Maps");
        await expect(pom.nth(1)).toHaveText("Warp/Google:Maps");

        for (let index = 0; index < 10; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
        }
    });

    test("Not adjust on formal list update", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("g");
        await pom.down();
        await pom.press(" ");

        // Assert
        await expect(pom.selected).toHaveText("Warp/Google:Drive");
        await expect(pom.nth(1)).toHaveText("Warp/Google:Drive");

        for (let index = 0; index < 10; index++) {
            if (index === 1) {
                continue;
            }

            await expect(pom.nth(index)).not.toHaveClass("selected");
        }
    });

    test("First is active after empty list", async ({ page, extensionId }) => {
        // Arrange
        const pom = new PopupPage(page, extensionId);

        // Act
        await pom.search("ggg");
        await pom.backspace();
        await pom.backspace();
        await pom.backspace();

        // Assert
        await expect(pom.selected).toHaveText("Warp/Chat:Discord");

        for (let index = 1; index < 10; index++) {
            await expect(pom.nth(index)).not.toHaveClass("selected");
        }
    });
});