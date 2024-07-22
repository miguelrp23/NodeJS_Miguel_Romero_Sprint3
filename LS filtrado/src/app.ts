
const fs = require('fs')
const path = require('path')
const folder = process.argv[2]
const ext = '.' + process.argv[3]

function lista(){

    //fs.readdir es un metodo asincronico 
    fs.readdir(folder, function (err:NodeJS.ErrnoException | null , files: string[]) {
        //err = error y hacemos if 
        if (err) return console.error(err)
        files.forEach(function (file) {
    //path.extname es un modulo prediseñado 
          if (path.extname(file) === ext) {
            console.log(file)
          }
        })
      })

}



export { lista }
