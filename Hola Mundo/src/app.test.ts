
import { saludo } from './app';
// se escribe la descripcion de la prueba
describe('Pruebas para saludo', () => {
    // lo que deberia devolver
  test('Debería devolver HELLO WORLD', () => {
    expect(saludo).toBe('HELLO WORLD');
  });
});
