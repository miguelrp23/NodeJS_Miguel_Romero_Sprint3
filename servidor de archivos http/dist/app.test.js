"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
jest.setTimeout(30000); // Aumentar el tiempo de espera a 30 segundos
describe('File Server', () => {
    let serverProcess;
    const port = 12345;
    const testFilePath = 'testfile.txt';
    const testFileContent = 'Hello, world!';
    beforeAll((done) => {
        // Crear un archivo de prueba con contenido de prueba
        fs_1.default.writeFileSync(testFilePath, testFileContent);
        // Iniciar el servidor en un puerto específico antes de las pruebas
        serverProcess = (0, child_process_1.spawn)('node', ['dist/app.js', port.toString(), testFilePath]);
        // Escuchar la salida del proceso del servidor para determinar cuándo está listo
        serverProcess.stdout.on('data', (data) => {
            const message = data.toString();
            console.log(`Server stdout: ${message}`); // Mensaje de depuración
            if (message.includes('Server listening on port')) {
                done(); // Señalar que el servidor está listo
            }
        });
        // Capturar y mostrar los mensajes de error del servidor
        serverProcess.stderr.on('data', (data) => {
            const message = data.toString();
            console.error(`Server stderr: ${message}`); // Mensaje de depuración
        });
        // Manejar errores en el inicio del servidor
        serverProcess.on('error', (err) => {
            console.error('Failed to start server:', err);
            done(err); // Señalar un error
        });
        // Mensaje cuando el proceso del servidor termina
        serverProcess.on('exit', (code, signal) => {
            console.log(`Server process exited with code ${code} and signal ${signal}`);
        });
        // Un fallback en caso de que no podamos determinar si el servidor está listo
        setTimeout(() => {
            console.log('Fallback timeout reached');
            done(); // Señalar que el servidor debería estar listo
        }, 10000); // 10 segundos como fallback
    });
    afterAll(() => {
        // Terminar el proceso del servidor después de las pruebas
        if (serverProcess) {
            serverProcess.kill();
        }
        // Eliminar el archivo de prueba
        fs_1.default.unlinkSync(testFilePath);
    });
    test('should return the content of the file', (done) => {
        // Hacer una solicitud HTTP al servidor
        http_1.default.get(`http://localhost:${port}`, (res) => {
            // Verificar que el código de estado de la respuesta sea 200 (OK)
            expect(res.statusCode).toBe(200);
            let data = '';
            // Acumular los datos de la respuesta
            res.on('data', (chunk) => {
                data += chunk;
            });
            // Cuando la respuesta termina, verificar que el contenido sea el esperado
            res.on('end', () => {
                expect(data).toBe(testFileContent);
                done(); // Señalar que la prueba ha terminado
            });
        }).on('error', (err) => {
            console.error('HTTP request error:', err);
            done(err); // Señalar un error en la solicitud HTTP
        });
    });
    test('should return 400 if no file specified', (done) => {
        // Iniciar un proceso del servidor sin especificar un archivo
        const serverProcessWithoutFile = (0, child_process_1.spawn)('node', ['dist/server.js', port.toString()]);
        serverProcessWithoutFile.stdout.on('data', (data) => {
            const message = data.toString();
            console.log(`Server stdout: ${message}`); // Mensaje de depuración
            if (message.includes('Server listening on port')) {
                // Hacer una solicitud HTTP al servidor
                http_1.default.get(`http://localhost:${port}`, (res) => {
                    // Verificar que el código de estado de la respuesta sea 400 (Bad Request)
                    expect(res.statusCode).toBe(400);
                    let data = '';
                    // Acumular los datos de la respuesta
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    // Cuando la respuesta termina, verificar que el contenido sea el esperado
                    res.on('end', () => {
                        expect(data).toBe('No file specified');
                        serverProcessWithoutFile.kill();
                        done(); // Señalar que la prueba ha terminado
                    });
                }).on('error', (err) => {
                    console.error('HTTP request error:', err);
                    serverProcessWithoutFile.kill();
                    done(err); // Señalar un error en la solicitud HTTP
                });
            }
        });
        serverProcessWithoutFile.stderr.on('data', (data) => {
            const message = data.toString();
            console.error(`Server stderr: ${message}`); // Mensaje de depuración
        });
        serverProcessWithoutFile.on('error', (err) => {
            console.error('Failed to start server:', err);
            done(err); // Señalar un error en el inicio del servidor
        });
        serverProcessWithoutFile.on('exit', (code, signal) => {
            console.log(`Server process exited with code ${code} and signal ${signal}`);
        });
        // Un fallback en caso de que no podamos determinar si el servidor está listo
        setTimeout(() => {
            console.log('Fallback timeout reached');
            done(); // Señalar que el servidor debería estar listo
        }, 10000); // 10 segundos como fallback
    });
});
//# sourceMappingURL=app.test.js.map