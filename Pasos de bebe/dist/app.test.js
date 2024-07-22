"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// Redefinir temporalmente process.argv
const originalArgv = process.argv;
const originalConsoleLog = console.log;
// Capturar la salida de console.log
let logOutput = app_1.operacion;
console.log = (output) => {
    logOutput = output;
};
// Configurar los argumentos de prueba
process.argv = ['node', 'index.js', '4', '5', '6'];
// Ejecutar la función de suma
(0, app_1.suma)();
// Restaurar process.argv y console.log
process.argv = originalArgv;
console.log = originalConsoleLog;
// Verificar el resultado
test('Suma de los argumentos proporcionados', () => {
    expect(logOutput).toBe(15);
});
//# sourceMappingURL=app.test.js.map