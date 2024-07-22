"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = void 0;
const http = require('http');
const bl = require('bl');
const results = [];
let count = 0; //contador 
//contador 
function printResults() {
    for (let i = 0; i < 3; i++) {
        console.log(results[i]);
    }
}
//funcion http del modulo "httpGet"
function httpGet(index) {
    http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
            if (err) {
                return console.error(err); // ponemos la condicion del error 
            }
            results[index] = data.toString(); // pasamos el data que es un buffer a un string
            count++;
            // condicion 
            if (count === 3) {
                printResults(); // aqui ponemos la condicion de que si el contador es igual a 3 se van a imprimir los resultados
            }
        }));
    });
}
exports.httpGet = httpGet;
//contador
for (let i = 0; i < 3; i++) {
    httpGet(i);
}
//# sourceMappingURL=app.js.map