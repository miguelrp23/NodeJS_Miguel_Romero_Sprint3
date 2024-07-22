


let operacion = 0;
function suma() {

    for (let i = 2; i < process.argv.length; i++) {
        operacion += +process.argv[i]
       
      }
      
      console.log(operacion);


}

suma()

export {suma, operacion}