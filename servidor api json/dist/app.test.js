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
describe('HTTP Time Server', () => {
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
    test('should return the time parsed in JSON format for /api/parsetime', (done) => {
        const isoDate = new Date().toISOString();
        const req = http_1.default.request({
            hostname: 'localhost',
            port: port,
            path: `/api/parsetime?iso=${encodeURIComponent(isoDate)}`,
            method: 'GET',
        }, (res) => {
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
        });
        req.on('error', (err) => {
            done(err);
        });
        req.end();
    });
    test('should return the Unix time in JSON format for /api/unixtime', (done) => {
        const isoDate = new Date().toISOString();
        const req = http_1.default.request({
            hostname: 'localhost',
            port: port,
            path: `/api/unixtime?iso=${encodeURIComponent(isoDate)}`,
            method: 'GET',
        }, (res) => {
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
        });
        req.on('error', (err) => {
            done(err);
        });
        req.end();
    });
    test('should return 404 for unknown API paths', (done) => {
        http_1.default.get(`http://localhost:${port}/unknown`, (res) => {
            expect(res.statusCode).toBe(404);
            done();
        }).on('error', (err) => {
            done(err);
        });
    });
});
//# sourceMappingURL=app.test.js.map