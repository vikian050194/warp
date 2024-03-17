import {
    dom,
    getVersion
} from "../common/index.js";

export class Footer {
    mount() {
        const $target = document.querySelector("footer");

        const makeDiv = dom.makeElementCreator("div");
        const makeSpan = dom.makeElementCreator("span");
        const makeA = dom.makeElementCreator("a");

        const $navigationContainer = makeDiv();

        const makeSplitter = () => makeSpan({ text: "|" });
        const makeLink = (name) => {
            const $aWrapper = makeSpan();
            const $a = makeA({ text: name, href: `/${name}/${name}.html` });
            $aWrapper.append($a);
            return $aWrapper;
        };

        const pages = [
            "options",
            "history",
            "frequency",
            "counters",
            "download",
            "changelog",
            "help"
        ];

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            $navigationContainer.append(makeLink(page));

            if (i < pages.length - 1) {
                $navigationContainer.append(makeSplitter());
            }
        }

        $target.append($navigationContainer);

        const versionValue = getVersion();
        const $version = makeSpan({ id: "version", text: versionValue });
        const $versionContainer = makeDiv();
        $versionContainer.append($version);

        $target.append($versionContainer);
    }
}