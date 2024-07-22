"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineas = exports.archivo = void 0;
const fs = require("fs");
//identificar el archivo
const archivo = fs.readFileSync(process.argv[2]);
exports.archivo = archivo;
// leer las lineas del archivo 
const lineas = archivo.toString().split('\n').length - 1;
exports.lineas = lineas;
console.log(lineas);
//# sourceMappingURL=app.js.map