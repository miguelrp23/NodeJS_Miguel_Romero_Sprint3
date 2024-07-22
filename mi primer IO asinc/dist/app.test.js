"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const fs_1 = __importDefault(require("fs"));
jest.mock('fs');
describe('Prueba para contarlineas', () => {
    it('debería contar las líneas en un archivo existente', () => {
        const file = 'testfile.txt';
        const fileContents = 'linea1\nlinea2\nlinea3\n';
        const buffer = Buffer.from(fileContents);
        // Mockear fs.readFile para simular la lectura exitosa del archivo
        fs_1.default.readFile.mockImplementation((filename, callback) => {
            callback(null, buffer);
        });
        // Capturar console.log para verificar la salida
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        // Llamar a la función que ejecuta fs.readFile
        (0, app_1.contarlineas)();
        // Verificar que console.log haya sido llamado con el número correcto de líneas
        expect(consoleLogSpy).toHaveBeenCalledWith(3);
    });
});
//# sourceMappingURL=app.test.js.map