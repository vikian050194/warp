export class MockDomElement {
    constructor(tag) {
        this.tag = tag;
        this.children = [];
    }

    get firstChild() {
        if (this.children.length) {
            return this.children[0];
        }

        return undefined;
    }

    appendChild = (...x) => this.children.push(...x);

    removeChild = (x) => {
        const index = this.children.indexOf(x);
        this.children.splice(index, 1);
    };

    addEventListener = (action, handler) => {
        this[`on${action}`] = handler;
    };

    setAttribute = (key, value) => {
        this[key] = value;
    };
}