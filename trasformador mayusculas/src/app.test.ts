import http from 'http';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { once } from 'events';

jest.setTimeout(30000); // Establece un tiempo de espera largo para permitir el inicio del servidor

describe('HTTP Uppercase Server', () => {
  let serverProcess: ChildProcessWithoutNullStreams;
  const port = 12345;

  beforeAll(async () => {
    // Inicia el servidor en un puerto específico antes de las pruebas
    serverProcess = spawn('node', ['dist/app.js', port.toString()]);

    // Espera hasta que el servidor esté escuchando
    await new Promise<void>((resolve, reject) => {
      serverProcess.stdout.on('data', (data) => {
        if (data.toString().includes('Server listening')) {
          resolve();
        }
      });
      serverProcess.stderr.on('data', (data) => {
        reject(new Error(`Server error: ${data}`));
      });
      serverProcess.on('error', (err) => {
        reject(err);
      });
    });
  });

  afterAll(() => {
    // Termina el proceso del servidor después de las pruebas
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  test('should respond with uppercase text', (done) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: port,
        method: 'POST',
      },
      (res) => {
        expect(res.statusCode).toBe(200);

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          expect(data).toBe('HELLO WORLD'); // Asegúrate de enviar "hello world" en la solicitud
          done();
        });
      }
    );

    req.on('error', (err) => {
      done(err);
    });

    // Envía un texto en minúsculas que debería convertirse a mayúsculas
    req.write('hello world');
    req.end();
  });

  test('should respond with "send me a POST" for non-POST requests', (done) => {
    http.get(`http://localhost:${port}`, (res) => {
      expect(res.statusCode).toBe(200);

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(data).toBe('send me a POST\n');
        done();
      });
    }).on('error', (err) => {
      done(err);
    });
  });
});
