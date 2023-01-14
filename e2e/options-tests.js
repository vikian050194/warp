import { test, expect } from "./fixtures.js";
import { OptionsPage } from "./pom/index.js";

test.describe("Options", () => {
    test.beforeEach(async ({ page, extensionId }) => {
        await page.waitForTimeout(2000);

        const pom = new OptionsPage(extensionId, page);
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

    test("Sections", async ({ page }) => {
        // Arrange
        const sections = page.locator("h2");

        // Assert
        await expect(sections.nth(0)).toHaveText("Bookmarks");
        await expect(sections.nth(1)).toHaveText("History");
        await expect(sections.nth(2)).toHaveText("Results");
        await expect(sections.nth(3)).toHaveText("Appearance");
        await expect(sections.nth(4)).toHaveText("Tabs");
    });

    test("Section: Bookmarks", async ({ page }) => {
        // Arrange
        const saveButton = page.locator("#save");

        const isCustomDir = page.locator("#is-custom-directory");
        await expect(isCustomDir).toBeChecked({ checked: false });
        const customDir = page.locator("#custom-directory");
        await expect(customDir).toHaveValue("Warp");

        // Act
        await isCustomDir.click();

        await customDir.fill("Hello");
        await expect(customDir).toHaveValue("Hello");

        await saveButton.click();
        await page.reload();

        // Assert
        await expect(isCustomDir).toBeChecked({ checked: true });
        await expect(customDir).toHaveValue("Hello");
    });

    test("Section: History", async ({ page }) => {
        // Arrange
        const saveButton = page.locator("#save");

        const maxCount = page.locator("#history-max-count");
        await expect(maxCount).toHaveValue("100000");
        const expirationTime = page.locator("#history-expiration-time");
        await expect(await expirationTime.inputValue()).toBe("31536000");

        // Act
        await maxCount.fill("500");
        await expirationTime.selectOption("2678400");

        await saveButton.click();
        await page.reload();

        // Assert
        await expect(maxCount).toHaveValue("500");
        await expect(await expirationTime.inputValue()).toBe("2678400");
    });

    test("Section: Results", async ({ page }) => {
        // Arrange
        const saveButton = page.locator("#save");

        const results = page.locator("#results-per-page");
        await expect(await results.inputValue()).toBe("10");
        const sorting = page.locator("#results-sorting");
        await expect(await sorting.inputValue()).toBe("frequency");

        // Act
        await results.selectOption("3");
        await sorting.selectOption("alphabet");

        await saveButton.click();
        await page.reload();

        // Assert
        await expect(await results.inputValue()).toBe("3");
        await expect(await sorting.inputValue()).toBe("alphabet");
    });

    test("Section: Appearance", async ({ page }) => {
        // Arrange
        const saveButton = page.locator("#save");

        const fontSize = page.locator("#ui-font-size");
        await expect(await fontSize.inputValue()).toBe("12px");
        const selectedColor = page.locator("#ui-selected-item-color");
        await expect(await selectedColor.inputValue()).toBe("#EC4339");
        const fontWeight = page.locator("#ui-selected-item-font-weight");
        await expect(await fontWeight.inputValue()).toBe("bold");
        const arrow = page.locator("#ui-selected-item-arrow");
        await expect(arrow).toBeChecked({ checked: true });

        // Act
        await fontSize.selectOption("8px");
        await selectedColor.selectOption("#00A0DC");
        await fontWeight.selectOption("normal");
        await arrow.click();

        await saveButton.click();
        await page.reload();

        // Assert
        await expect(await fontSize.inputValue()).toBe("8px");
        await expect(await selectedColor.inputValue()).toBe("#00A0DC");
        await expect(await fontWeight.inputValue()).toBe("normal");
        await expect(arrow).toBeChecked({ checked: false });
    });

    test("Section: Tabs", async ({ page }) => {
        // Arrange
        const saveButton = page.locator("#save");

        const newTab = page.locator("#new-tab-on-shift");
        await expect(newTab).toBeChecked({ checked: true });
        const keepGroup = page.locator("#new-tab-keep-group");
        await expect(keepGroup).toBeChecked({ checked: true });

        // Act
        await newTab.click();
        await keepGroup.click();

        await saveButton.click();
        await page.reload();

        // Assert
        await expect(newTab).toBeChecked({ checked: false });
        await expect(keepGroup).toBeChecked({ checked: false });
    });
});