import net from 'net';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

jest.setTimeout(30000); // Aumentar el tiempo de espera a 30 segundos

// Función para obtener la fecha actual en el formato esperado
function getFormattedDate(): string {
  function newdate(i: number): string {
    return (i < 10 ? '0' : '') + i;
  }

  const d = new Date();
  return d.getFullYear() + '-' +
    newdate(d.getMonth() + 1) + '-' +
    newdate(d.getDate()) + ' ' +
    newdate(d.getHours()) + ':' +
    newdate(d.getMinutes());
}

describe('Time Server', () => {
  let serverProcess: ChildProcessWithoutNullStreams;

  beforeAll((done) => {
    // Iniciar el servidor en un puerto específico antes de las pruebas
    serverProcess = spawn('node', ['dist/app.js', '12345']);

    serverProcess.stdout.on('data', (data) => {
      const message = data.toString();
      console.log(`Server stdout: ${message}`); // Mensaje de depuración
      if (message.includes('Server listening on port')) {
        done();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      const message = data.toString();
      console.error(`Server stderr: ${message}`); // Mensaje de depuración
    });

    serverProcess.on('error', (err) => {
      console.error('Failed to start server:', err);
      done(err);
    });

    serverProcess.on('exit', (code, signal) => {
      console.log(`Server process exited with code ${code} and signal ${signal}`);
    });

    // Un fallback en caso de que no podamos determinar si el servidor está listo
    setTimeout(() => {
      console.log('Fallback timeout reached');
      done();
    }, 10000); // 10 segundos como fallback
  });

  afterAll(() => {
    // Terminar el proceso del servidor después de las pruebas
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  test('should return the current date and time', (done) => {
    const client = net.connect({ port: 12345 }, () => {
      console.log('Client connected'); // Mensaje de depuración
      client.on('data', (data) => {
        const serverTime = data.toString().trim();
        const currentTime = getFormattedDate();
        console.log(`Server time: ${serverTime}, Current time: ${currentTime}`); // Mensaje de depuración
        expect(serverTime).toBe(currentTime);
        client.end();
        done();
      });

      client.on('error', (err) => {
        console.error('Client connection error:', err);
        done(err);
      });
    });
  });
});
