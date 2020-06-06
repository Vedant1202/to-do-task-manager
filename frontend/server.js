const http = require('http');
const nodeStatic = require('node-static');

const file = new nodeStatic.Server('./static');
const PORT = process.env.PORT || 8080;

http.createServer(function (request, response) {
    request
        .addListener('end', function () {
            file.serve(request, response);
        })
        .resume();
}).listen(PORT);
