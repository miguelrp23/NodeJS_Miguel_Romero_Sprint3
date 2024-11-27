const fs = require('fs');
var elements = fs.readFileSync(process.argv[2]);
var newlines = elements.toString().split('\n').length - 1;
console.log(newlines);