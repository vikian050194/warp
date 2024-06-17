import { test, expect, timeout } from "../fixtures.js";
import {
    PopupPage,
    OptionsPage
} from "../pom/index.js";

test.describe("Autoclose", () => {
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

    test("Enabled - 0 sec", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.clickAutoclosePin();
        await options.autoclose.enabled.isChecked(true);
        await options.autoclose.time.setValue("0");
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
        await expect(page.isClosed()).toBeTruthy();
    });

    test("Enabled - 1 sec", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.clickAutoclosePin();
        await options.autoclose.enabled.isChecked(true);
        await options.autoclose.time.setValue("1");
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
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.isClosed()).toBeTruthy();
    });

    test("Enabled - 1 sec - prevented", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.clickAutoclosePin();
        await options.autoclose.enabled.isChecked(true);
        await options.autoclose.time.setValue("1");
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
        await pom.down();

        // Assert
        await expect(newPage).toHaveURL(new RegExp("example.com"));
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.isClosed()).toBeFalsy();
    });

    test("Disabled", async ({ page, extensionId, context }) => {
        // Arrange
        const options = new OptionsPage(await context.newPage(), extensionId);
        await options.goto();

        await options.clickAutoclosePin();
        await options.autoclose.enabled.isChecked(true);
        await options.autoclose.enabled.click();
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
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.isClosed()).toBeFalsy();
    });
});