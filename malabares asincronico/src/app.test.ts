import http, { IncomingMessage, RequestOptions } from 'http';
import { Readable } from 'stream';

// Función que realiza la solicitud HTTP
export function httpGet(url: string | URL, options: RequestOptions = {}, callback?: (res: IncomingMessage) => void): http.ClientRequest {
  // Verifica si `url` es un objeto `URL` y conviértelo a `string` si es necesario
  const urlString = typeof url === 'string' ? url : url.toString();

  return http.get(urlString, options, (res: IncomingMessage) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (callback) {
        callback(res); // Llama al callback con la respuesta
      }
    });
  });
}

// Ejemplo de uso
const request = httpGet('http://example.com', {}, (res) => {
  console.log('Response received:', res.statusCode);
});

// Asegúrate de gestionar errores y otros eventos según sea necesario
request.on('error', (err) => {
  console.error('Error en la solicitud:', err);
});

// Prueba unitaria utilizando Jest
describe('HTTP Get Requests', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch data from all URLs and print the results', async () => {
    const responses = [
      'Response from URL 1',
      'Response from URL 2',
      'Response from URL 3'
    ];

    // Mock de la función http.get
    const getMock = jest.spyOn(http, 'get');

    // Configurar el comportamiento del mock
    getMock.mockImplementation((url, options: RequestOptions, callback?: (res: IncomingMessage) => void) => {
      console.log(`Mocking http.get with URL: ${url}`);

      // Simular una respuesta de flujo legible con datos específicos
      const readable = new Readable();
      readable._read = () => {}; // Necesario para los flujos legibles
      readable.push(responses.shift()); // Obtener y eliminar el primer elemento del array de respuestas
      readable.push(null); // Fin del flujo

      // Crear una instancia simulada de IncomingMessage
      const response = new IncomingMessage(readable as any);
      response.statusCode = 400; // Configurar un código de estado si es necesario

      // Llamar al callback de manera asíncrona usando setImmediate
      if (callback) {
        setImmediate(() => {
          callback(response); // Llamar al callback con la respuesta simulada
        });
      }

      // Devolver un objeto ClientRequest simulado (no es necesario para la prueba)
      return {} as http.ClientRequest;
    });

    // Ejecutar las llamadas httpGet para iniciar las llamadas HTTP simuladas
    await Promise.all([
      httpGet('http://example1.com'),
      httpGet('http://example2.com'),
      httpGet('http://example3.com')
    ]);

    // Verificar que console.log fue llamado con los resultados esperados
    responses.forEach((response) => {
      expect(consoleLogSpy).toHaveBeenCalledWith(response);
    });

    // Verificar el número exacto de llamadas a console.log
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  });
});

