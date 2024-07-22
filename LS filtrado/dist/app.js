"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = void 0;
const fs = require('fs');
const path = require('path');
const folder = process.argv[2];
const ext = '.' + process.argv[3];
function lista() {
    //fs.readdir es un metodo asincronico 
    fs.readdir(folder, function (err, files) {
        //err = error y hacemos if 
        if (err)
            return console.error(err);
        files.forEach(function (file) {
            //path.extname es un modulo prediseñado 
            if (path.extname(file) === ext) {
                console.log(file);
            }
        });
    });
}
exports.lista = lista;
//# sourceMappingURL=app.js.map