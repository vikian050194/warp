import { OPTIONS } from "../../src/common/constants/index.js";
import { BasePage, BasePOM } from "./base.js";
import { ModalPopup } from "./modal.js";

class InputOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, id) {
        super(page);

        this.locator = page.locator(`#${id}`);
    }

    async setValue(value) {
        await this.locator.fill(value);
    }

    async hasValue(value) {
        await this.expect(this.locator).toHaveValue(value);
    }
}

class CheckboxOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, id) {
        super(page);

        this.locator = page.locator(`#${id}`);
    }

    async click() {
        await this.locator.click();
    }

    async isChecked(checked = true) {
        await this.expect(this.locator).toBeChecked({ checked });
    }
}

class SelectOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, id) {
        super(page);

        this.locator = page.locator(`#${id}`);
    }

    async click() {
        await this.locator.click();
    }

    async setValue(value) {
        await this.locator.selectOption(value);
    }

    async hasValue(value) {
        await this.expect(await this.locator.inputValue()).toBe(value);
    }
}

export class BookmarksOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.isCustomDir = new CheckboxOption(page, OPTIONS.IS_CUSTOM_DIRECTORY);
        this.customDir = new InputOption(page, OPTIONS.CUSTOM_DIRECTORY);
    }
}

export class HistoryOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.maxCount = new InputOption(page, OPTIONS.HISTORY_MAX_COUNT);
        this.expirationTime = new SelectOption(page, OPTIONS.HISTORY_EXPIRATION_TIME);
    }
}

export class SearchOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.isCaseSensitive = new CheckboxOption(page, OPTIONS.SEARCH_IS_CASE_SENSITIVE);
        this.isStartsWith = new CheckboxOption(page, OPTIONS.SEARCH_IS_STARTS_WITH);
    }
}

export class ResultsOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.perPage = new SelectOption(page, OPTIONS.RESULTS_PER_PAGE);
        this.sorting = new SelectOption(page, OPTIONS.RESULTS_SORTING);
        this.looping = new CheckboxOption(page, OPTIONS.RESULTS_LOOPING);
    }
}

export class UiOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.fontSize = new SelectOption(page, OPTIONS.UI_FONT_SIZE);
        this.selectedItemColor = new SelectOption(page, OPTIONS.UI_SELECTED_ITEM_COLOR);
        this.selectedItemFontWeight = new SelectOption(page, OPTIONS.UI_SELECTED_ITEM_FONT_WEIGHT);
        this.selectedItemArrow = new CheckboxOption(page, OPTIONS.UI_SELECTED_ITEM_ARROW);
    }
}

export class TabOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.action = new CheckboxOption(page, OPTIONS.NEW_TAB_ON_SHIFT);
        this.group = new CheckboxOption(page, OPTIONS.NEW_TAB_KEEP_GROUP);
        this.neighbour = new SelectOption(page, OPTIONS.NEW_TAB_KEEP_NEIGHBOUR);
    }
}

export class AutocloseOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.enabled = new CheckboxOption(page, OPTIONS.IS_AUTOCLOSE_ENABLED);
        this.time = new SelectOption(page, OPTIONS.AUTOCLOSE_TIME);
    }
}

export class ChangelogOptions extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.show = new CheckboxOption(page, OPTIONS.CHANGELOG_SHOW);
    }
}

export class OptionsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, extensionId) {
        super(page, extensionId);

        this.bookmarks = new BookmarksOptions(page);
        this.history = new HistoryOptions(page);
        this.search = new SearchOptions(page);
        this.results = new ResultsOptions(page);
        this.ui = new UiOptions(page);
        this.tab = new TabOptions(page);
        this.autoclose = new AutocloseOptions(page);
        this.changelog = new ChangelogOptions(page);

        this.saveButton = page.locator("#save");
        this.pins = page.locator("div.pins");
        this.tabs = page.locator("div.tabs");

        this.modal = new ModalPopup(page);
    }

    async goto() {
        await super.goto("options");
    }

    async save() {
        await this.saveButton.click();
    }

    getPin(index) {
        return this.pins.locator(`button[pin-id="${index}"]`);
    }

    getTab(index) {
        return this.tabs.locator(`div[tab-id="${index}"]`);
    }
}
