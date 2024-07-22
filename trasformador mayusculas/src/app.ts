const http = require('http')
const map = require('through2-map')

const server = http.createServer(function (req: any, res: any) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk: any) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

const port = Number(process.argv[2]) || 12345;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
