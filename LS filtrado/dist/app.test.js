"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const fs_1 = __importDefault(require("fs"));
jest.mock('fs');
describe('Pruebas para lista de archivos por extensión', () => {
    it('debería listar archivos con la extensión especificada', () => {
        const mockFiles = ['archivo1.js', 'archivo2.js', 'archivo3.ts'];
        // Mockear fs.readdir para simular la lista de archivos
        fs_1.default.readdir.mockImplementation((path, callback) => {
            callback(null, mockFiles);
        });
        // Capturar console.log para verificar la salida
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        // Llamar a la función lista con la extensión '.js'
        (0, app_1.lista)();
        // Verificar que console.log haya sido llamado con los archivos filtrados
        setTimeout(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith(['archivo1.js', 'archivo2.js']); // Asegúrate de que la extensión coincida
            // Restaura el mock de console.log
            consoleLogSpy.mockRestore();
        }, 100); // Timeout para asegurar que la llamada asíncrona ha completado
    });
    it('debería manejar correctamente errores al listar archivos', () => {
        // Simular un error al listar archivos
        const error = new Error('Error al leer el directorio');
        fs_1.default.readdir.mockImplementation((path, callback) => {
            callback(error, []);
        });
        // Capturar console.error para verificar la salida de error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        // Llamar a la función lista
        (0, app_1.lista)();
        // Verificar que console.error haya sido llamado con el error esperado
        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
        // Restaura el mock de console.error
        consoleErrorSpy.mockRestore();
    });
});
//# sourceMappingURL=app.test.js.map