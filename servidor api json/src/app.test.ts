import http from 'http';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { once } from 'events';

jest.setTimeout(30000); // Establece un tiempo de espera largo para permitir el inicio del servidor

describe('HTTP Time Server', () => {
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

  test('should return the time parsed in JSON format for /api/parsetime', (done) => {
    const isoDate = new Date().toISOString();
    const req = http.request(
      {
        hostname: 'localhost',
        port: port,
        path: `/api/parsetime?iso=${encodeURIComponent(isoDate)}`,
        method: 'GET',
      },
      (res) => {
        expect(res.statusCode).toBe(200);

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(data);
          const expected = {
            hour: new Date(isoDate).getHours(),
            minute: new Date(isoDate).getMinutes(),
            second: new Date(isoDate).getSeconds(),
          };
          expect(parsedData).toEqual(expected);
          done();
        });
      }
    );

    req.on('error', (err) => {
      done(err);
    });

    req.end();
  });

  test('should return the Unix time in JSON format for /api/unixtime', (done) => {
    const isoDate = new Date().toISOString();
    const req = http.request(
      {
        hostname: 'localhost',
        port: port,
        path: `/api/unixtime?iso=${encodeURIComponent(isoDate)}`,
        method: 'GET',
      },
      (res) => {
        expect(res.statusCode).toBe(200);

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(data);
          const expected = {
            unixtime: new Date(isoDate).getTime(),
          };
          expect(parsedData).toEqual(expected);
          done();
        });
      }
    );

    req.on('error', (err) => {
      done(err);
    });

    req.end();
  });

  test('should return 404 for unknown API paths', (done) => {
    http.get(`http://localhost:${port}/unknown`, (res) => {
      expect(res.statusCode).toBe(404);
      done();
    }).on('error', (err) => {
      done(err);
    });
  });
});
