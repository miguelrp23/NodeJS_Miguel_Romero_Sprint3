const fs = require('fs');
fs.readFile(process.argv[2], (err, data)=>{
    var newlines = data.toString().split('\n').length - 1;
    console.log(newlines); 
});