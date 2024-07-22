const http = require('http')
const fs = require('fs')

// crea el server con un modulo fs y http 

const server = http.createServer(function (req: any, res: any) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))