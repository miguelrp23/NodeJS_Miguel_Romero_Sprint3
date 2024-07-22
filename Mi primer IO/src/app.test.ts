import fs from 'fs';
import path from 'path';
import contarPalabras from './contar';

describe('Contar palabras de un archivo', () => {
  const archivoTemporal = path.join(__dirname, 'archivo_temporal.txt');

  beforeAll(() => {
    // Crear el archivo temporal con contenido de prueba
    fs.writeFileSync(archivoTemporal, 'Esta es una prueba de conteo de palabras.\nOtra línea con más palabras.');
  });

  afterAll(() => {
    // Eliminar el archivo temporal
    fs.unlinkSync(archivoTemporal);
  });

  it('debería contar correctamente las palabras en el archivo', () => {
    const contenido = fs.readFileSync(archivoTemporal, 'utf-8');
    const numeroDePalabras = contarPalabras(contenido);
    expect(numeroDePalabras).toBe(13); // Hay 13 palabras en el archivo temporal
  });
});
