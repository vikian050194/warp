export const makeElement = (tag, { id = null, text = null, className = null, ...misc } = {}) => {
    const newElement = document.createElement(tag);
    if (id) {
        newElement.id = id;
    }
    if (className) {
        newElement.className = className;
    }
    if (text) {
        const textContent = document.createTextNode(text);
        newElement.appendChild(textContent);
    }
    if (Object.keys(misc)) {
        for (const key in misc) {
            if (Object.hasOwnProperty.call(misc, key)) {
                const value = misc[key];
                newElement.setAttribute(key, value);
            }
        }
    }

    return newElement;
};

export const makeElementCreator = (tag) => ({ id = null, text = null, className = null, ...misc } = {}) => makeElement(tag, { id, text, className, ...misc });
