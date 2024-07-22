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