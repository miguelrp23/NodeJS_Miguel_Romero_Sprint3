"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacion = exports.suma = void 0;
let operacion = 0;
exports.operacion = operacion;
function suma() {
    for (let i = 2; i < process.argv.length; i++) {
        exports.operacion = operacion += +process.argv[i];
    }
    console.log(operacion);
}
exports.suma = suma;
suma();
//# sourceMappingURL=app.js.map