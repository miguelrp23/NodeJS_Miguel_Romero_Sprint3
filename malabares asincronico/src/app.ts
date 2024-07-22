const http = require('http')
const bl = require('bl')
const results: string[] = []
let count = 0 //contador 


//contador 
function printResults () {
  for (let i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

//funcion http del modulo "httpGet"
function httpGet (index: number) {
  http.get(process.argv[2 + index], function (response: any) { // ponemos 3 argumnetos para la correcta ejecucion del modulo
    response.pipe(bl(function (err: NodeJS.ErrnoException , data: Buffer) {
      if (err) {
        return console.error(err)  // ponemos la condicion del error 
      }

      results[index] = data.toString() // pasamos el data que es un buffer a un string
      count++

        // condicion 
      if (count === 3) {
        printResults() // aqui ponemos la condicion de que si el contador es igual a 3 se van a imprimir los resultados
      }
    }))
  })
}

//contador
for (let i = 0; i < 3; i++) {
  httpGet(i)
}

export {httpGet}