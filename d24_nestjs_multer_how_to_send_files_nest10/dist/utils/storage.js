"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorage = exports.storageDir = void 0;
const path = require("path");
const multer_1 = require("multer");
const mime = require("mime");
const uuid_1 = require("uuid");
function storageDir() {
    return path.join(__dirname, '../../storage');
}
exports.storageDir = storageDir;
function multerStorage(dest) {
    return (0, multer_1.diskStorage)({
        destination: (req, file, cb) => cb(null, dest),
        filename: (req, file, cb) => cb(null, `${(0, uuid_1.v4)()}.${mime.extensions[file.mimetype]}`),
    });
}
exports.multerStorage = multerStorage;
//# sourceMappingURL=storage.js.map