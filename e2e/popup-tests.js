import { test, expect } from "./fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "./pom/index.js";

test.describe("Popup", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(1000);

        const options = new OptionsPage(page, extensionId);
        await options.goto();

        await options.ui.selectedItemArrow.click();
        await options.save();

        const pom = new PopupPage(page, extensionId);
        await pom.goto();

        await context.pages()[0].close();
    });

    test.describe("Query", () => {
        test("Empty", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Assert
            await expect(pom.query).toHaveText("...");
        });

        test("One word", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await page.type("body", "maps");

            // Assert
            await expect(pom.query).toHaveText("maps");
        });

        test("Two words", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await page.type("body", "maps cz");

            // Assert
            await expect(pom.query).toHaveText("maps cz");
        });

        test("Clean", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await page.type("body", "maps");
            for (let index = 0; index < 4; index++) {
                await pom.backspace();
            }

            // Assert
            await expect(pom.query).toHaveText("...");
        });
    });

    test.describe("Items", () => {
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

        test("Start from beginning on the next page", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.down();
            await pom.right();

            // Assert
            await expect(pom.selected).toHaveText("Warp/Google:Keep");
            await expect(pom.nth(0)).toHaveText("Warp/Google:Keep");

            for (let index = 1; index < 10; index++) {
                await expect(pom.nth(index)).not.toHaveClass("selected");
                await expect(pom.nth(index)).not.toHaveText("...");
            }
        });
    });

    test.describe("Actions", () => {
        test("Update tab", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);
            const updatedPage = await context.newPage();

            // Act
            await pom.search("example");
            await pom.enter();

            // Assert
            await expect(updatedPage).toHaveURL(new RegExp("example.com"));
        });

        test("Open new tab without group", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });

        test("Open new tab and keep a group (without group)", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.controlShiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });
    });

    test.describe("Paging", () => {
        test("Initial page", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Assert
            await expect(pom.back).not.toHaveClass("arrow animated");
            await expect(pom.pager).toHaveText("1/4");
            await expect(pom.next).toHaveClass("arrow animated");
        });

        test("Middle page", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            await pom.right();

            // Assert
            await expect(pom.back).toHaveClass("arrow animated");
            await expect(pom.pager).toHaveText("2/4");
            await expect(pom.next).toHaveClass("arrow animated");
        });

        test("Last page", async ({ page, extensionId }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            // Act
            for (let index = 0; index < 3; index++) {
                await pom.right();
            }

            // Assert
            await expect(pom.back).toHaveClass("arrow animated");
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
            await expect(pom.next).toHaveClass("arrow animated");
        });
    });
});