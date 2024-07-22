"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const contar_1 = __importDefault(require("./contar"));
describe('Contar palabras de un archivo', () => {
    const archivoTemporal = path_1.default.join(__dirname, 'archivo_temporal.txt');
    beforeAll(() => {
        // Crear el archivo temporal con contenido de prueba
        fs_1.default.writeFileSync(archivoTemporal, 'Esta es una prueba de conteo de palabras.\nOtra línea con más palabras.');
    });
    afterAll(() => {
        // Eliminar el archivo temporal
        fs_1.default.unlinkSync(archivoTemporal);
    });
    it('debería contar correctamente las palabras en el archivo', () => {
        const contenido = fs_1.default.readFileSync(archivoTemporal, 'utf-8');
        const numeroDePalabras = (0, contar_1.default)(contenido);
        expect(numeroDePalabras).toBe(13); // Hay 13 palabras en el archivo temporal
    });
});
//# sourceMappingURL=app.test.js.map