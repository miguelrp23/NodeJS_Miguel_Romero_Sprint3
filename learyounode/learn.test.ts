// Tests para la sección "hello word"

import { saludo } from './learnyounode'; 

describe('Hello Word', () => {
    test('debería retornar "HELLO WORLD"', () => {
        expect(saludo).toBe("HELLO WORLD");
    });
});

// Tests para la sección "baby steps"

import { suma } from './learnyounode';

describe('Baby Steps', () => {
    beforeAll(() => {
       
        process.argv = ['node', 'tuArchivo.js', '1', '2', '3', '4']; 
    });

    test('debería sumar los números pasados como argumentos', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        suma();
        expect(consoleLogSpy).toHaveBeenCalledWith(10); 
        consoleLogSpy.mockRestore();
    });
});

// Tests para la sección "my first I/O"

import { leer } from './learnyounode';

jest.mock('./contar', () => ({
    contarPalabras: jest.fn(() => 5) 
}));

describe('My First I/O', () => {
    test('debería contar las palabras en el archivo', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        leer();
        expect(consoleLogSpy).toHaveBeenCalledWith('Contenido del archivo:', "this is a name");
        expect(consoleLogSpy).toHaveBeenCalledWith(5); 
        consoleLogSpy.mockRestore();
    });
});

// Tests para la sección "my first I/O async"

import { contarlineas } from './learnyounode';
import fs from 'fs';

jest.mock('fs');

describe('My First I/O Async', () => {
    test('debería contar las líneas del archivo', (done) => {
        const mockContent = Buffer.from('line1\nline2\nline3\n');
        (fs.readFile as unknown as jest.Mock).mockImplementation((path: string, callback: (err: any, data: Buffer) => void) => {
            callback(null, mockContent);
        });

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        contarlineas();
        
        setImmediate(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith(3); 
            consoleLogSpy.mockRestore();
            done();
        });
    });
});

// Tests para la sección "filtered LS"

import { lista } from './learnyounode';


jest.mock('fs');

describe('Filtered LS', () => {
    test('debería listar archivos con la extensión especificada', (done) => {
        const mockFiles = ['file1.txt', 'file2.js', 'file3.txt'];
        (fs.readdir as unknown as jest.Mock).mockImplementation((folder: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
            callback(null, mockFiles);
        });

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        process.argv = ['node', 'tuArchivo.js', 'folder', 'txt']; 

        lista();
        
        setImmediate(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith('file1.txt');
            expect(consoleLogSpy).toHaveBeenCalledWith('file3.txt');
            consoleLogSpy.mockRestore();
            done();
        });
    });
});

// Tests para la sección "HTTP client"

import { client } from './learnyounode';


jest.mock('http');

describe('HTTP Client', () => {
    test('debería hacer una solicitud HTTP GET y registrar la respuesta', (done) => {
        const mockResponseData = 'Hello, world!';
        const mockGet = jest.fn().mockImplementation((url, callback) => {
            callback({
                setEncoding: jest.fn(),
                on: jest.fn((event, cb) => {
                    if (event === 'data') {
                        cb(mockResponseData);
                    }
                    if (event === 'end') {
                        cb();
                    }
                }),
            });
            return { on: jest.fn() };
        });

        (http.get as jest.Mock) = mockGet;

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        process.argv = ['node', 'tuArchivo.js', 'http://example.com']; 

        client();

        setImmediate(() => {
            expect(consoleLogSpy).toHaveBeenCalledWith(mockResponseData);
            consoleLogSpy.mockRestore();
            done();
        });
    });
});

// Tests para la sección "http collect"

import nock from 'nock';
import { collect } from './learnyounode'; 
import { Readable } from 'stream';


const originalArgv = process.argv;

describe('http collect', () => {
  beforeAll(() => {

    process.argv = [...originalArgv, 'http://example.com/test'];
  });

  afterAll(() => {

    process.argv = originalArgv;
  });

  it('debería recibir y procesar la respuesta HTTP correctamente', async () => {
    const responseText = 'Texto de prueba';

    const readable = new Readable();
    readable.push(responseText);
    readable.push(null); 

   
    nock('http://example.com').get('/test').reply(200, () => readable);

  
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    collect();

 
    await new Promise((resolve) => setTimeout(resolve, 500));

  
    expect(consoleSpy).toHaveBeenCalledWith(responseText.length);
    expect(consoleSpy).toHaveBeenCalledWith(responseText);

 
    consoleSpy.mockRestore();
  });
});

// Tests para la sección "juggling async"

import { jugglingAsync } from './learnyounode';

jest.mock('http');
jest.mock('bl');

describe('Juggling Async', () => {
    const originalArgv = process.argv;
    beforeAll(() => {
      process.argv = [...originalArgv, 'http://example.com/1', 'http://example.com/2', 'http://example.com/3'];
    });
  
    afterAll(() => {
      process.argv = originalArgv;
    });
  
    test('debería hacer tres solicitudes HTTP y registrar las respuestas', (done) => {
      const mockResponses = ['Response 1', 'Response 2', 'Response 3'];
  
     
      nock('http://example.com')
        .get('/1')
        .reply(200, mockResponses[0])
        .get('/2')
        .reply(200, mockResponses[1])
        .get('/3')
        .reply(200, mockResponses[2]);
  
      
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
     
      jugglingAsync((responses) => {
        responses.forEach((response, index) => {
          console.log(response);
        });
  
        
        expect(consoleLogSpy).toHaveBeenCalledWith(mockResponses[0]);
        expect(consoleLogSpy).toHaveBeenCalledWith(mockResponses[1]);
        expect(consoleLogSpy).toHaveBeenCalledWith(mockResponses[2]);
  
       
        consoleLogSpy.mockRestore();
  
        done(); 
      });
    });
  });

// Tests para la sección "time server"

import { datenow } from './learnyounode';
import net from 'net';

jest.mock('net');

describe('Time Server', () => {
    test('debería devolver la fecha y hora actual al cliente', (done) => {
        const mockSocket = {
            end: jest.fn(),
        };
        (net.createServer as jest.Mock) = jest.fn((callback) => {
            callback(mockSocket);
            return {
                listen: jest.fn(),
            };
        });

        process.argv = ['node', 'tuArchivo.js', '12345']; 

        datenow();

        setImmediate(() => {
            expect(mockSocket.end).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}\n$/)); 
            done();
        });
    });
});

// Tests para la sección "http file server"

import { FileServer } from './learnyounode'


jest.mock('fs');
jest.mock('http');

describe('HTTP File Server', () => {
    test('debería servir un archivo al cliente', (done) => {
        const mockReadStream = {
            pipe: jest.fn(),
        };
        (fs.createReadStream as jest.Mock) = jest.fn(() => mockReadStream);
        const mockServer = {
            listen: jest.fn((port, callback) => {
                callback();
            }),
        };
        (http.createServer as jest.Mock) = jest.fn((callback) => {
            callback({} as any, {} as any);
            return mockServer;
        });

        process.argv = ['node', 'tuArchivo.js', '12345', 'test.txt']; 

        FileServer();

        setImmediate(() => {
            expect(fs.createReadStream).toHaveBeenCalledWith('test.txt');
            expect(mockReadStream.pipe).toHaveBeenCalled();
            done();
        });
    });
});

// Tests para la sección "http uppercaserer"

import { uppercaserer } from './learnyounode';

import through2 from 'through2-map';

jest.mock('http');
jest.mock('through2-map');

describe('HTTP Uppercaserer', () => {
    test('debería convertir el texto en mayúsculas', (done) => {
        const mockSocket = {};
        (http.createServer as jest.Mock) = jest.fn((callback) => {
            callback({ method: 'POST', pipe: jest.fn() }, { end: jest.fn() });
            return { listen: jest.fn() };
        });

        process.argv = ['node', 'tuArchivo.js', '12345']; 

        uppercaserer();

        setImmediate(() => {
            expect(through2).toHaveBeenCalled();
            done();
        });
    });
});

// Tests para la sección "http Json API Server"

import { API } from './learnyounode';
import http from 'http';

jest.mock('http');

describe('HTTP Json API Server', () => {
    test('debería responder con la hora y minutos', (done) => {
        const mockRequest = { url: '/api/parsetime?iso=2022-01-01T00:00:00Z' };
        const mockResponse = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };
        
        (http.createServer as jest.Mock) = jest.fn((callback) => {
            callback(mockRequest, mockResponse);
            return { listen: jest.fn() };
        });

        process.argv = ['node', 'tuArchivo.js', '12345']; 

        API();

        setImmediate(() => {
            expect(mockResponse.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
            expect(mockResponse.end).toHaveBeenCalledWith(JSON.stringify({ hour: 1, minute: 0, second: 0 }));
            done();
        });
    });
});
