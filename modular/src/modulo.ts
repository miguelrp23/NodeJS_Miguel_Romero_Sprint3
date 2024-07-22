const fs = require("fs");
const path = require("path");


module.exports = 
function (folder: string, ext:string, callback:any ){
    fs.readdir(folder, function (err:NodeJS.ErrnoException | null, lista:string[]) {
    if (err){
        return callback (err);
    }
       
    lista = lista.filter(function(file){

        return path.extname(file) == "." + ext

    })
    callback(null, lista)
})

}
export {}