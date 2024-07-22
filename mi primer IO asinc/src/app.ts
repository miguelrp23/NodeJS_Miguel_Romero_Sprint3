const fs = require("fs");
const file = process.argv[2];

function contarlineas() {
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
