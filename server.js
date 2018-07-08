const http = require('http');
const app = require('./app');

const port = process.env.PORT || 7800;

const server = http.createServer(app);

server.listen(port);