// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: "e2e",
    testMatch: /.*-tests\.js/,
    workers: 4,
    retries: 0,
    fullyParallel: true,
    use: {
        viewport: null,
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure"
    },
    expect: {
        timeout: 1000
    }
};

export default config;
