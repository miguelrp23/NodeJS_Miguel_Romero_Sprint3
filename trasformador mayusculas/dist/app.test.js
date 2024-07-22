"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const child_process_1 = require("child_process");
jest.setTimeout(30000); // Establece un tiempo de espera largo para permitir el inicio del servidor
describe('HTTP Uppercase Server', () => {
    let serverProcess;
    const port = 12345;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Inicia el servidor en un puerto específico antes de las pruebas
        serverProcess = (0, child_process_1.spawn)('node', ['dist/app.js', port.toString()]);
        // Espera hasta que el servidor esté escuchando
        yield new Promise((resolve, reject) => {
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
    }));
    afterAll(() => {
        // Termina el proceso del servidor después de las pruebas
        if (serverProcess) {
            serverProcess.kill();
        }
    });
    test('should respond with uppercase text', (done) => {
        const req = http_1.default.request({
            hostname: 'localhost',
            port: port,
            method: 'POST',
        }, (res) => {
            expect(res.statusCode).toBe(200);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                expect(data).toBe('HELLO WORLD'); // Asegúrate de enviar "hello world" en la solicitud
                done();
            });
        });
        req.on('error', (err) => {
            done(err);
        });
        // Envía un texto en minúsculas que debería convertirse a mayúsculas
        req.write('hello world');
        req.end();
    });
    test('should respond with "send me a POST" for non-POST requests', (done) => {
        http_1.default.get(`http://localhost:${port}`, (res) => {
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
//# sourceMappingURL=app.test.js.map