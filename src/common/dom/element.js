export const makeElement = (tag, { id = null, text = null, className = null } = {}) => {
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
    return newElement;
};

export const makeElementCreator = (tag) => ({ id = null, text = null, className = null } = {}) => makeElement(tag, { id, text, className });
