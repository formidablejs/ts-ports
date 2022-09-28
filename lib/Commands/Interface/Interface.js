"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = void 0;
const path = require('path');
const stubs_1 = require("@formidablejs/stubs");
class Interface extends stubs_1.Stub {
    /**
     * @inheritDoc
     */
    get stub() {
        const file = path.join(__dirname, 'stub');
        return file;
    }
    /**
     * @inheritDoc
     */
    get fileName() {
        return this.realClassName + '.ts';
    }
    /**
     * @inheritDoc
     */
    get destination() {
        return 'app/Interfaces';
    }
}
exports.Interface = Interface;
