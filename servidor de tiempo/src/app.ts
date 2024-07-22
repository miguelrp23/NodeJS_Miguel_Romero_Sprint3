const net = require('net') // modulo necesario para la red "hacer un servidor"

function newdate (i: number) {
  return (i < 10 ? '0' : '') + i
}

// programar la fecha que queremos
function now () {
  const d = new Date()
  return d.getFullYear() + '-' +
    newdate(d.getMonth() + 1) + '-' +
    newdate(d.getDate()) + ' ' +
    newdate(d.getHours()) + ':' +
    newdate(d.getMinutes())
}

// utilizamos el modulo para crear el server
const server = net.createServer(function (socket: any) { //tiene callback y un socket
  socket.end(now() + '\n')
})

const port = Number(process.argv[2]) || 12345;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
