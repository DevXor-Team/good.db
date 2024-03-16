"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteValueAtPath = exports.getValueAtPath = exports.setValueAtPath = void 0;
const ErrorMessage_1 = require("./ErrorMessage");
function setValueAtPath(object, key, value, options) {
    const { separator = '.' } = options || {};
    const keyParts = key.split(separator);
    let currentObject = object;
    for (let i = 0; i < keyParts.length - 1; i++) {
        const part = keyParts[i];
        if (!currentObject[part]) {
            currentObject[part] = {};
        }
        else if (typeof currentObject[part] !== 'object') {
            throw new ErrorMessage_1.DatabaseError(`Cannot create property '${part}' on ${typeof currentObject[part]}`);
        }
        currentObject = currentObject[part];
    }
    ;
    const lastPart = keyParts[keyParts.length - 1];
    const isArrayIndex = !isNaN(parseInt(lastPart, 10));
    if (Array.isArray(currentObject) && !isArrayIndex) {
        throw new ErrorMessage_1.DatabaseError(`Cannot set value at '${key}' because '${lastPart}' is not a valid array index.`);
    }
    ;
    currentObject[lastPart] = value;
    return {
        object,
        key: keyParts[0],
        value,
        currentObject: object[keyParts[0]]
    };
}
exports.setValueAtPath = setValueAtPath;
;
function getValueAtPath(object, key, options) {
    const { separator = '.' } = options || {};
    const keyParts = key.split(separator);
    let currentObject = object;
    for (let i = 0; i < keyParts.length; i++) {
        const part = keyParts[i];
        if (!currentObject[part]) {
            return {
                object,
                key: keyParts[keyParts.length - 1],
                value: undefined,
                currentObject: undefined
            };
        }
        else if (i === keyParts.length - 1) {
            return {
                object,
                key: keyParts[keyParts.length - 1],
                value: currentObject[part],
                currentObject
            };
        }
        currentObject = currentObject[part];
    }
    ;
    return {
        object,
        key: keyParts[keyParts.length - 1],
        value: currentObject,
        currentObject
    };
}
exports.getValueAtPath = getValueAtPath;
;
function deleteValueAtPath(object, key, options) {
    const { separator = '.' } = options || {};
    const keyParts = key.split(separator);
    let currentObject = object;
    for (let i = 0; i < keyParts.length - 1; i++) {
        const part = keyParts[i];
        if (!currentObject[part]) {
            return {
                object,
                key: keyParts[0],
                value: undefined,
                currentObject
            };
        }
        else if (i === keyParts.length - 1) {
            return {
                object,
                key: keyParts[0],
                value: undefined,
                currentObject
            };
        }
        currentObject = currentObject[part];
    }
    ;
    const lastPart = keyParts[keyParts.length - 1];
    const isArrayIndex = !isNaN(parseInt(lastPart, 10));
    if (Array.isArray(currentObject) && !isArrayIndex) {
        throw new ErrorMessage_1.DatabaseError(`Cannot delete value at '${key}' because '${lastPart}' is not a valid array index.`);
    }
    ;
    delete currentObject[lastPart];
    return {
        object,
        key: keyParts[0],
        value: undefined,
        currentObject: object[keyParts[0]]
    };
}
exports.deleteValueAtPath = deleteValueAtPath;
;
//# sourceMappingURL=nested.js.map