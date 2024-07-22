"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
module.exports =
    function (folder, ext, callback) {
        fs.readdir(folder, function (err, lista) {
            if (err) {
                return callback(err);
            }
            lista = lista.filter(function (file) {
                return path.extname(file) == "." + ext;
            });
            callback(null, lista);
        });
    };
//# sourceMappingURL=modulo.js.map