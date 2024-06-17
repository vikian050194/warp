import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Actions", () => {
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

    test.describe("Open tab", () => {
        test("Always, no group", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            await context.newPage();
            await context.pages()[0].bringToFront();

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });

        test("Never, no group", async ({ page, extensionId, context }) => {
            // Arrange
            const options = new OptionsPage(await context.newPage(), extensionId);
            await options.goto();

            await options.clickTabsPin();
            await options.tab.neighbour.setValue("never");
            await options.save();
            await options.close();

            await context.newPage();
            await context.pages()[0].bringToFront();

            const pom = new PopupPage(page, extensionId);
            await pom.reload();

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });

        test("Only in group, no group", async ({ page, extensionId, context }) => {
            // Arrange
            const options = new OptionsPage(await context.newPage(), extensionId);
            await options.goto();

            await options.clickTabsPin();
            await options.tab.neighbour.setValue("only-in-group");
            await options.save();
            await options.close();

            await context.newPage();
            await context.pages()[0].bringToFront();

            const pom = new PopupPage(page, extensionId);
            await pom.reload();

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });

        test("Only without group, no group", async ({ page, extensionId, context }) => {
            // Arrange
            const options = new OptionsPage(await context.newPage(), extensionId);
            await options.goto();

            await options.clickTabsPin();
            await options.tab.neighbour.setValue("only-without-group");
            await options.save();
            await options.close();

            await context.newPage();
            await context.pages()[0].bringToFront();

            const pom = new PopupPage(page, extensionId);
            await pom.reload();

            // Act
            await pom.search("example");
            const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                pom.shiftEnter()
            ]);

            // Assert
            await expect(newPage).toHaveURL(new RegExp("example.com"));
        });

        test("Keep group, always, no group", async ({ page, extensionId, context }) => {
            // Arrange
            const pom = new PopupPage(page, extensionId);

            await context.newPage();
            await context.pages()[0].bringToFront();

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
});