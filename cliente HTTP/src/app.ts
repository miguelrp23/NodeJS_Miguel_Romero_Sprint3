import http from 'http';

const url = process.argv[2];

http.get(url, (response) => {
  response.setEncoding('utf8');
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    console.log(data);
  });

}).on('error', (error) => {
  console.error(error);
});
