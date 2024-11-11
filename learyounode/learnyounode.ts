//hello word

const saludo:string = "HELLO WORLD";

console.log(saludo);

export {saludo}

//baby steps

function suma() {
    let operacion = 0;
    for (let i = 2; i < process.argv.length; i++) {
        operacion += +process.argv[i]
       
      }
      
      console.log(operacion);


}
suma()

export {suma}

// my first I/O

 import { contarPalabras } from "./contar";
  export function leer() {
  
      const archivo =("this is a name"); 
      console.log('Contenido del archivo:', archivo); 
      const numeroDePalabras = contarPalabras(archivo); 
      console.log(numeroDePalabras); 
    
   
 }
    





//my first I/O async

function contarlineas() {
    const fs = require("fs");
    const file = process.argv[2];
  fs.readFile(file, function (err: NodeJS.ErrnoException | null, contents: Buffer) {
    if (err) {
      return console.log(err);
    }
    const lines = contents.toString().split("\n").length - 1;
    console.log(lines);
  });
}

contarlineas();

export { contarlineas };


//filtered LS


function lista(p0?: string, p1?: string, mockCallback?: jest.Mock<any, any>) {
  const fs = require('fs');
  const path = require('path');
  const folder = process.argv[2];
  const ext = '.' + process.argv[3];
  
  fs.readdir(folder, function (err: NodeJS.ErrnoException | null, files: string[]) {
      if (err) return console.error(err);
      files.forEach(function (file) {
          if (path.extname(file) === ext) {
              console.log(file);
          }
      });
  });
}


export { lista }

//Make it modular


const modulo = require("./modulo")

const folder = process.argv[2];
const ext = process.argv[3];

modulo(folder, ext, function(err: NodeJS.ErrnoException | null, lista: string[]){
if (err){

    return console.error("hay un error", err)
}

lista.forEach(function(file) {
    console.log(file)
    
    });
    
});

export{}


//HTTP client

import http from 'http';
export function client (){
   
    const url = process.argv[2];

    http.get(url, (response) => {
      response.setEncoding('utf8');
      let data = '';
    
      response.on('data', (chunk) => {
        data += chunk;
      });
    
      response.on('end', () => {
        console.log(data);
      });
    
    }).on('error', (error) => {
      console.error(error);
    });

}


//http collect


export function collect() {
  const bl = require('bl');

  http.get(process.argv[2], function (response: any) {
    response.pipe(
      bl(function (err: any, data: string) {
        if (err) {
          return console.error(err);
        }
        data = data.toString();
        console.log(data.length);
        console.log(data);
      })
    );
  });
}


//juggling async

export function jugglingAsync(callback: (responses: string[]) => void) {
  const urls = [
    process.argv[2],
    process.argv[3],
    process.argv[4]
  ];

  const results: string[] = [];
  let completedRequests = 0;

  urls.forEach((url, index) => {
    http.get(url, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        results[index] = data;
        completedRequests += 1;
        if (completedRequests === urls.length) {
          callback(results);
        }
      });
    });
  });
}



//time server



export function datenow(){

    const net = require('net') 
    function newdate (i: number) {
        return (i < 10 ? '0' : '') + i
      }
      
      
      function now () {
        const d = new Date()
        return d.getFullYear() + '-' +
          newdate(d.getMonth() + 1) + '-' +
          newdate(d.getDate()) + ' ' +
          newdate(d.getHours()) + ':' +
          newdate(d.getMinutes())
      }
      
     
      const server = net.createServer(function (socket: any) { 
        socket.end(now() + '\n')
      })
      
      const port = Number(process.argv[2]) || 12345;
      server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });

}


// http file server

export function FileServer(){

    const http = require('http')
    const fs = require('fs')

    
    const server = http.createServer(function (req: any, res: any) {
      res.writeHead(200, { 'content-type': 'text/plain' })
    
      fs.createReadStream(process.argv[3]).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))

}


// http uppercaserer
export function uppercaserer(){

    const http = require('http')
    const map = require('through2-map')
    
    const server = http.createServer(function (req: any, res: any) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }
    
      req.pipe(map(function (chunk: any) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })
    
    const port = Number(process.argv[2]) || 12345;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
}

//http Json API Server


import { URL } from 'url';

export function API(){

    function parsetime(time: Date): { hour: number, minute: number, second: number } {
        return {
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds()
        };
      }
      
      
      function unixtime(time: Date): { unixtime: number } {
        return { unixtime: time.getTime() };
      }
      
      
      const server = http.createServer((req, res) => {
      
        const parsedUrl = new URL(req.url || '', 'http://example.com');
        
       
        const time = new Date(parsedUrl.searchParams.get('iso') || '');
        let result;
      
        
        if (/^\/api\/parsetime/.test(req.url || '')) {
          result = parsetime(time);
        } else if (/^\/api\/unixtime/.test(req.url || '')) {
          result = unixtime(time);
        }
      
        
        if (result) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(404);
          res.end();
        }
      });
      
      
      const port = Number(process.argv[2]) || 12345;
      server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
      

}
