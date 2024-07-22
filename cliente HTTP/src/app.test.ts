import http from 'http';

jest.mock('http');

describe('Prueba de Solicitud HTTP GET', () => {
  const originalArgv = process.argv.slice(); // Guardamos el estado original de process.argv

  beforeEach(() => {
    jest.resetModules(); // Resetamos los módulos para limpiar los mocks
    process.argv = originalArgv.slice(); // Restauramos process.argv antes de cada prueba
  });

  afterEach(() => {
    process.argv = originalArgv.slice(); // Restauramos process.argv después de cada prueba
  });

  it('debe registrar datos cuando se recibe una respuesta', async () => {
    const mockUrl = 'http://www.example.com'; // URL simulada para la prueba
    process.argv[2] = mockUrl; // Asignamos la URL simulada a process.argv[2]

    // Configuramos el mock de http.get
    const mockResponse = {
      setEncoding: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === 'data') {
          callback('datos simulados'); // Simulamos recibir datos
        }
        if (event === 'end') {
          callback(); // Simulamos el fin de la respuesta
        }
      }),
    };

    (http.get as jest.Mock).mockImplementation((url, callback) => {
      callback(mockResponse); // Llamamos al callback con el mockResponse simulado
      return {
        on: jest.fn(), // Necesitamos devolver un objeto con el método `.on()`
        end: jest.fn()
      } as any;
    });

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Espiamos console.log
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Espiamos console.error

    // Importa el módulo después de configurar los mocks
    require('../src/app');

    // Espera que los mocks sean llamados con un pequeño retraso
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(logSpy).toHaveBeenCalledWith('datos simulados'); // Verificamos que console.log haya sido llamado con los datos simulados
    expect(errorSpy).not.toHaveBeenCalled(); // Verificamos que console.error no haya sido llamado

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
