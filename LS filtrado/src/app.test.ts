import { lista } from './app';
import fs from 'fs';

jest.mock('fs');

describe('Pruebas para lista de archivos por extensión', () => {
  it('debería listar archivos con la extensión especificada', () => {
    const mockFiles = ['archivo1.js', 'archivo2.js', 'archivo3.ts'];

    // Mockear fs.readdir para simular la lista de archivos
    (fs.readdir as unknown as jest.Mock).mockImplementation((path: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
      callback(null, mockFiles);
    });

    // Capturar console.log para verificar la salida
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Llamar a la función lista con la extensión '.js'
    lista();

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
    (fs.readdir as unknown as jest.Mock).mockImplementation((path: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
      callback(error, []);
    });

    // Capturar console.error para verificar la salida de error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Llamar a la función lista
    lista();

    // Verificar que console.error haya sido llamado con el error esperado
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);

    // Restaura el mock de console.error
    consoleErrorSpy.mockRestore();
  });
});
