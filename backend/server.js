const http = require('http')
const app = require('./app')
const config = require('./config')


app.set('port', config.server.port)


const server = http.createServer(app);

server.listen(app.get('port'), () =>{
    console.log(`Server listening on port ${app.get('port')}`);
});

server.on('error', (err) =>{
    console.log(`Error en el servidor`);
})
