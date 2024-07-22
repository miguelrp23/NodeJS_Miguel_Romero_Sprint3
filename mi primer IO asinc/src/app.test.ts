import { contarlineas } from './app';
import fs from 'fs';

jest.mock('fs');

describe('Prueba para contarlineas', () => {
  it('debería contar las líneas en un archivo existente', () => {
    const file = 'testfile.txt';
    const fileContents = 'linea1\nlinea2\nlinea3\n';
    const buffer = Buffer.from(fileContents);

    // Mockear fs.readFile para simular la lectura exitosa del archivo
    (fs.readFile as unknown as jest.Mock).mockImplementation((filename: string, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void) => {
      callback(null, buffer);
    });

    // Capturar console.log para verificar la salida
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Llamar a la función que ejecuta fs.readFile
    contarlineas();

    // Verificar que console.log haya sido llamado con el número correcto de líneas
    expect(consoleLogSpy).toHaveBeenCalledWith(3);
  });
});
