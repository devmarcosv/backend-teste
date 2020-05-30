const server = require('./utils/server.js');

let port = process.env.PORT_APP || 3000;

server.listen(port, () => {
    console.log("Servidor inicializado na porta: " + port);
});