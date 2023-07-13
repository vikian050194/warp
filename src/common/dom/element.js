export const makeElement = (tag, { id = null, text = null, className = null, classList = [], ...other } = {}) => {
    const newElement = document.createElement(tag);
    if (id) {
        newElement.id = id;
    }
    if (className) {
        newElement.className = className;
    }
    if (classList.length > 0) {
        newElement.className = classList.join(" ");
    }
    if (text) {
        const textContent = document.createTextNode(text);
        newElement.appendChild(textContent);
    }

    if (other) {
        for (const key in other) {
            const value = other[key];
            newElement[key] = value;
        }
    }

    return newElement;
};

export const makeElementCreator = (tag) => ({ id = null, text = null, className = null, ...other } = {}) => makeElement(tag, { id, text, className, ...other });
