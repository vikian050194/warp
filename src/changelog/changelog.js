import { getVersion } from "../common/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const $modal = document.getElementById("modal-one");

    const version = getVersion();
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");

    if (reason === null) {
        return;
    }

    let header = null;

    if (reason === "install" || reason === "update") {
        header = `${version} is installed!`;
    } else {
        return;
    }

    const description = [
        "Inspect changelog notes and try latest extension features!"
    ];

    $modal.querySelector("h1").innerHTML = header;
    $modal.querySelector("div.description").innerHTML = description.map(p => `<p>${p}</p>`).join("");
    $modal.classList.add("open");
    const exits = $modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
            event.preventDefault();
            $modal.classList.remove("open");
        });
    });

    // Version
    document.getElementById("version").innerText = version;
});
