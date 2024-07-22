const fs = require("fs")

//identificar el archivo
const archivo = fs.readFileSync(process.argv[2])

// leer las lineas del archivo 
const lineas = archivo.toString().split('\n').length - 1
console.log(lineas)


export {archivo, lineas}