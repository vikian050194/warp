// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: "e2e",
    testMatch: /.*-tests\.js/,
    workers: 1,
    retries: 0,
    fullyParallel: false,
    use: {
        viewport: { width: 1280, height: 720 },
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure"
    }
};

export default config;
