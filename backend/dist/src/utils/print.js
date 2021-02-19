"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFile = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function printFile(content, fileName) {
    try {
        var buffer = Buffer.from(content, 'binary');
        var dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '__tests__', 'recipes')
            : "C:\\\\gresppro-x64\\backend\\commands\\commandsCreate\\";
        fs_1.default.writeFile(dir + "/" + fileName + ".rtf", buffer, { encoding: 'utf-8', flag: 'w' }, function () { });
        return;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.printFile = printFile;
