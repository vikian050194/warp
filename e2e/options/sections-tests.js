import { test, timeout } from "../fixtures.js";
import { OptionsPage } from "../pom/index.js";

test.describe("Sections", () => {
    test.beforeEach(async ({ page, extensionId, context }) => {
        await page.waitForTimeout(timeout * 2);

        // TODO handle changelog automatic opening somehow else
        await context.pages()[0].close();
        await context.pages()[1].close();

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test("Bookmarks", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.bookmarks.isCustomDir.isChecked(false);
        await pom.bookmarks.customDir.hasValue("Warp");

        // Act
        await pom.bookmarks.isCustomDir.click();
        await pom.bookmarks.customDir.setValue("Hello");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.bookmarks.isCustomDir.isChecked(true);
        await pom.bookmarks.customDir.hasValue("Hello");
    });

    test("History", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(2).click();

        await pom.history.maxCount.hasValue("100000");
        await pom.history.expirationTime.hasValue("365");

        // Act
        await pom.history.maxCount.setValue("500");
        await pom.history.expirationTime.setValue("180");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.history.maxCount.hasValue("500");
        await pom.history.expirationTime.hasValue("180");
    });

    test("Results", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(3).click();

        await pom.results.perPage.hasValue("10");
        await pom.results.sorting.hasValue("frequency");
        await pom.results.looping.isChecked(true);

        // Act
        await pom.results.perPage.setValue("3");
        await pom.results.sorting.setValue("alphabet");
        await pom.results.looping.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.results.perPage.hasValue("3");
        await pom.results.sorting.hasValue("alphabet");
        await pom.results.looping.isChecked(false);
    });

    test("Appearance", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(4).click();

        await pom.ui.fontSize.hasValue("12");
        await pom.ui.selectedItemColor.hasValue("#EC4339");
        await pom.ui.selectedItemFontWeight.hasValue("bold");
        await pom.ui.selectedItemArrow.isChecked(true);

        // Act
        await pom.ui.fontSize.setValue("8");
        await pom.ui.selectedItemColor.setValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.setValue("normal");
        await pom.ui.selectedItemArrow.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.ui.fontSize.hasValue("8");
        await pom.ui.selectedItemColor.hasValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.hasValue("normal");
        await pom.ui.selectedItemArrow.isChecked(false);
    });

    test("Tabs", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(5).click();

        await pom.tab.action.isChecked(true);
        await pom.tab.group.isChecked(true);
        await pom.tab.neighbour.hasValue("always");

        // Act
        await pom.tab.action.click();
        await pom.tab.group.click();
        await pom.tab.neighbour.setValue("never");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.tab.action.isChecked(false);
        await pom.tab.group.isChecked(false);
        await pom.tab.neighbour.hasValue("never");
    });

    test("Autoclose", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(6).click();

        await pom.autoclose.enabled.isChecked(true);
        await pom.autoclose.time.hasValue("5");

        // Act
        await pom.autoclose.enabled.click();
        await pom.autoclose.time.setValue("1");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.autoclose.enabled.isChecked(false);
        await pom.autoclose.time.hasValue("1");
    });

    test("Changelog", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.getPin(7).click();

        await pom.changelog.show.isChecked(true);

        // Act
        await pom.changelog.show.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.changelog.show.isChecked(false);
    });
});