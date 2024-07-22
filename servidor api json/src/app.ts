import http from 'http';
import { URL } from 'url';

// Función para parsear la hora del objeto Date
function parsetime(time: Date): { hour: number, minute: number, second: number } {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  };
}

// Función para obtener el tiempo en formato Unix
function unixtime(time: Date): { unixtime: number } {
  return { unixtime: time.getTime() };
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  // Parsear la URL de la solicitud
  const parsedUrl = new URL(req.url || '', 'http://example.com');
  
  // Obtener el parámetro ISO de la URL
  const time = new Date(parsedUrl.searchParams.get('iso') || '');
  let result;

  // Determinar la respuesta basada en el path de la URL
  if (/^\/api\/parsetime/.test(req.url || '')) {
    result = parsetime(time);
  } else if (/^\/api\/unixtime/.test(req.url || '')) {
    result = unixtime(time);
  }

  // Enviar la respuesta adecuada
  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Escuchar en el puerto especificado en los argumentos de la línea de comandos
const port = Number(process.argv[2]) || 12345;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

