"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// se escribe la descripcion de la prueba
describe('Pruebas para saludo', () => {
    // lo que deberia devolver
    test('Debería devolver HELLO WORLD', () => {
        expect(app_1.saludo).toBe('HELLO WORLD');
    });
});
