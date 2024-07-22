"use strict";
const http = require('http');
const map = require('through2-map');
const server = http.createServer(function (req, res) {
    if (req.method !== 'POST') {
        return res.end('send me a POST\n');
    }
    req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase();
    })).pipe(res);
});
const port = Number(process.argv[2]) || 12345;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map