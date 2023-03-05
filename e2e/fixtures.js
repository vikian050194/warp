import { test as base, expect as exp, chromium } from "@playwright/test";
import path from "path";
import os from "os";
import fs from "fs";

const PWD = process.env.PWD;

export const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    context: async ({ }, use) => {
        const pathToExtension = path.join(PWD, "src");
        const pathToData = path.join(PWD, "e2e", "data", "Bookmarks");
        const pathToChromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), "profile-"));

        // fs.writeFileSync(path.join(PWD, "profile.log"), pathToChromeProfile);
        fs.mkdirSync(path.join(pathToChromeProfile, "Default"));
        fs.copyFileSync(pathToData, path.join(pathToChromeProfile, "Default", "Bookmarks"));

        const context = await chromium.launchPersistentContext(pathToChromeProfile, {
            headless: false,
            slowMo: 100,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                "--start-maximized"
            ]
        });

        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        let [background] = context.serviceWorkers();

        if (!background) {
            background = await context.waitForEvent("serviceworker");
        }

        const extensionId = background.url().split("/")[2];

        await use(extensionId);
    }
});

export const expect = exp;