import {
    Local,
    COUNTERS
} from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $since = document.getElementById(COUNTERS.SINCE);
    $since.innerText = await Local.get(COUNTERS.SINCE);

    const $update = document.getElementById(COUNTERS.OPEN_UPDATE);
    const update = await Local.get(COUNTERS.OPEN_UPDATE);
    $update.innerText = update;

    const $create = document.getElementById(COUNTERS.OPEN_CREATE);
    const create = await Local.get(COUNTERS.OPEN_CREATE);
    $create.innerText = create;

    const $total = document.getElementById(COUNTERS.OPEN_TOTAL);
    const total = update + create;
    $total.innerText = total;

    const $updatePercent = document.getElementById(`${COUNTERS.OPEN_UPDATE}-percent`);
    const updatePercent = total > 0 ? (100 * update / total).toFixed(2) : "0.00";
    $updatePercent.innerText = ` (${updatePercent}%)`;

    const $createPercent = document.getElementById(`${COUNTERS.OPEN_CREATE}-percent`);
    const createPercent = total > 0 ? (100.00 - parseFloat(updatePercent)).toFixed(2) : "0.00";
    $createPercent.innerText = ` (${createPercent}%)`;

    const $resetButton = document.getElementById("reset");
    $resetButton.addEventListener("click", async () => {
        await Local.set(COUNTERS.SINCE, new Date().toISOString());

        await Local.set(COUNTERS.OPEN_UPDATE, 0);
        await Local.set(COUNTERS.OPEN_CREATE, 0);
    });
});
