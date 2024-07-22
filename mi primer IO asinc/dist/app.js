"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contarlineas = void 0;
const fs = require("fs");
const file = process.argv[2];
function contarlineas() {
    fs.readFile(file, function (err, contents) {
        if (err) {
            return console.log(err);
        }
        const lines = contents.toString().split("\n").length - 1;
        console.log(lines);
    });
}
exports.contarlineas = contarlineas;
contarlineas();
//# sourceMappingURL=app.js.map