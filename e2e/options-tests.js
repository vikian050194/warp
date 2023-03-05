import { test, expect } from "./fixtures.js";
import { OptionsPage } from "./pom/index.js";

test.describe("Options", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(2000);

        const pom = new OptionsPage(page, extensionId);
        await pom.goto();
    });

    test.describe("Navigation", () => {
        test("Options", async ({ page }) => {
            // Arrange
            const link = page.locator("footer > span", { hasText: "options" });

            // Act
            await link.click();

            // Assert
            await expect(page).toHaveURL(new RegExp("options/options.html"));
        });

        test("History", async ({ page }) => {
            // Arrange
            const link = page.locator("footer > span", { hasText: "history" });

            // Act
            await link.click();

            // Assert
            await expect(page).toHaveURL(new RegExp("history/history.html"));
        });

        test("Frequency", async ({ page }) => {
            // Arrange
            const link = page.locator("footer > span", { hasText: "frequency" });

            // Act
            await link.click();

            // Assert
            await expect(page).toHaveURL(new RegExp("frequency/frequency.html"));
        });

        test("Counters", async ({ page }) => {
            // Arrange
            const link = page.locator("footer > span", { hasText: "counters" });

            // Act
            await link.click();

            // Assert
            await expect(page).toHaveURL(new RegExp("counters/counters.html"));
        });
    });

    test("Header", async ({ page }) => {
        // Arrange
        const header = page.locator("h1");

        // Assert
        await expect(header).toHaveText("Options");
    });

    test.describe("Tabs and pins", () => {
        test("Pins", async ({ page }) => {
            // Arrange
            const pom = new OptionsPage(page);

            // Assert
            await expect(pom.getPin(1)).toHaveText("Bookmarks");
            await expect(pom.getPin(2)).toHaveText("History");
            await expect(pom.getPin(3)).toHaveText("Results");
            await expect(pom.getPin(4)).toHaveText("Appearance");
            await expect(pom.getPin(5)).toHaveText("Tabs");
            await expect(pom.getPin(6)).toHaveText("Autoclose");
        });

        test("Tabs", async ({ page }) => {
            // Arrange
            const pom = new OptionsPage(page);

            // Assert
            await expect(pom.getTab(1).locator("h2")).toHaveText("Bookmarks");
            await expect(pom.getTab(2).locator("h2")).toHaveText("History");
            await expect(pom.getTab(3).locator("h2")).toHaveText("Results");
            await expect(pom.getTab(4).locator("h2")).toHaveText("Appearance");
            await expect(pom.getTab(5).locator("h2")).toHaveText("Tabs");
            await expect(pom.getTab(6).locator("h2")).toHaveText("Autoclose");

            for (let i = 1; i <= 6; i++) {
                if (i === 1) {
                    await expect(pom.getTab(i)).toBeVisible();
                } else {
                    await expect(pom.getTab(i)).toBeHidden();
                }
            }
        });

        test("Tabs visibility", async ({ page }) => {
            // Arrange
            const pom = new OptionsPage(page);

            // Assert
            for (let i = 1; i <= 6; i++) {
                await pom.getPin(i).click();
                for (let j = 1; j <= 6; j++) {
                    if (i === j) {
                        await expect(pom.getTab(j)).toBeVisible();
                    } else {
                        await expect(pom.getTab(j)).toBeHidden();
                    }
                }
            }
        });
    });

    test("Section: Bookmarks", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        const isCustomDir = page.locator("#is-custom-directory");
        await expect(isCustomDir).toBeChecked({ checked: false });
        const customDir = page.locator("#custom-directory");
        await expect(customDir).toHaveValue("Warp");

        // Act
        await isCustomDir.click();

        await customDir.fill("Hello");
        await expect(customDir).toHaveValue("Hello");

        await pom.save();
        await pom.reload();

        // Assert
        await expect(isCustomDir).toBeChecked({ checked: true });
        await expect(customDir).toHaveValue("Hello");
    });

    test("Section: History", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        const maxCount = page.locator("#history-max-count");
        await expect(maxCount).toHaveValue("100000");
        const expirationTime = page.locator("#history-expiration-time");
        await expect(await expirationTime.inputValue()).toBe("31536000");

        // Act
        await pom.getPin(2).click();
        await maxCount.fill("500");
        await expirationTime.selectOption("2678400");

        await pom.save();
        await pom.reload();

        // Assert
        await expect(maxCount).toHaveValue("500");
        await expect(await expirationTime.inputValue()).toBe("2678400");
    });

    test("Section: Results", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.results.perPage.hasValue("10");
        await pom.results.sorting.hasValue("frequency");
        await pom.results.looping.isChecked(true);

        // Act
        await pom.getPin(3).click();
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

    test("Section: Appearance", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.ui.fontSize.hasValue("12px");
        await pom.ui.selectedItemColor.hasValue("#EC4339");
        await pom.ui.selectedItemFontWeight.hasValue("bold");
        await pom.ui.selectedItemArrow.isChecked(true);

        // Act
        await pom.getPin(4).click();
        await pom.ui.fontSize.setValue("8px");
        await pom.ui.selectedItemColor.setValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.setValue("normal");
        await pom.ui.selectedItemArrow.click();

        await pom.save();
        await pom.reload();

        // Assert
        await pom.ui.fontSize.hasValue("8px");
        await pom.ui.selectedItemColor.hasValue("#00A0DC");
        await pom.ui.selectedItemFontWeight.hasValue("normal");
        await pom.ui.selectedItemArrow.isChecked(false);
    });

    test("Section: Tabs", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.tab.action.isChecked(true);
        await pom.tab.group.isChecked(true);
        await pom.tab.neighbour.hasValue("always");

        // Act
        await pom.getPin(5).click();
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

    test("Section: Autoclose", async ({ page }) => {
        // Arrange
        const pom = new OptionsPage(page);

        await pom.autoclose.enabled.isChecked(true);
        await pom.autoclose.time.hasValue("5");

        // Act
        await pom.getPin(6).click();
        await pom.autoclose.enabled.click();
        await pom.autoclose.time.setValue("1");

        await pom.save();
        await pom.reload();

        // Assert
        await pom.autoclose.enabled.isChecked(false);
        await pom.autoclose.time.hasValue("1");
    });
});