// Local storage supports only strings according to MDN
// These fuctions allow us to store objects that
// can be rendered in json

export function setLocalStorageItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorageItem(name, value) {
    return JSON.parse(localStorage.getItem(name));
}