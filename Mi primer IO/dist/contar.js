"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function contarPalabras(contenido) {
    // Contar las palabras en el contenido del archivo
    return contenido.split(/\s+/).filter(Boolean).length;
}
exports.default = contarPalabras;
//# sourceMappingURL=contar.js.map