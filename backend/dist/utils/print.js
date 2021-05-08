"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFileProof = exports.printFile = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function printFile(content, fileName) {
    try {
        const buffer = Buffer.from(content, 'binary');
        const dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '__tests__', 'recipes')
            : `C:\\\\gresppro-x64\\backend\\commands\\commandsCreate\\`;
        fs_1.default.writeFile(`${dir}/${fileName}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, () => { });
        return;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.printFile = printFile;
function printFileProof(content, fileName) {
    try {
        const buffer = Buffer.from(content, 'binary');
        const dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '__tests__', 'recipes')
            : `C:\\\\gresppro-x64\\backend\\commands\\proofCreate\\`;
        fs_1.default.writeFile(`${dir}/${fileName}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, () => { });
        return;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.printFileProof = printFileProof;
//# sourceMappingURL=print.js.map