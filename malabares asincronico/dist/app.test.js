"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = void 0;
const http_1 = __importStar(require("http"));
const stream_1 = require("stream");
// Función que realiza la solicitud HTTP
function httpGet(url, options = {}, callback) {
    // Verifica si `url` es un objeto `URL` y conviértelo a `string` si es necesario
    const urlString = typeof url === 'string' ? url : url.toString();
    return http_1.default.get(urlString, options, (res) => {
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
exports.httpGet = httpGet;
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
    let consoleLogSpy;
    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should fetch data from all URLs and print the results', () => __awaiter(void 0, void 0, void 0, function* () {
        const responses = [
            'Response from URL 1',
            'Response from URL 2',
            'Response from URL 3'
        ];
        // Mock de la función http.get
        const getMock = jest.spyOn(http_1.default, 'get');
        // Configurar el comportamiento del mock
        getMock.mockImplementation((url, options, callback) => {
            console.log(`Mocking http.get with URL: ${url}`);
            // Simular una respuesta de flujo legible con datos específicos
            const readable = new stream_1.Readable();
            readable._read = () => { }; // Necesario para los flujos legibles
            readable.push(responses.shift()); // Obtener y eliminar el primer elemento del array de respuestas
            readable.push(null); // Fin del flujo
            // Crear una instancia simulada de IncomingMessage
            const response = new http_1.IncomingMessage(readable);
            response.statusCode = 400; // Configurar un código de estado si es necesario
            // Llamar al callback de manera asíncrona usando setImmediate
            if (callback) {
                setImmediate(() => {
                    callback(response); // Llamar al callback con la respuesta simulada
                });
            }
            // Devolver un objeto ClientRequest simulado (no es necesario para la prueba)
            return {};
        });
        // Ejecutar las llamadas httpGet para iniciar las llamadas HTTP simuladas
        yield Promise.all([
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
    }));
});
//# sourceMappingURL=app.test.js.map