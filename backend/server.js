const app = require('./app')

app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log('Server listening on port 3000')
})

app.on('error', (err) =>{
    console.log(`Se produjo un error en el servidor: ${err}`);
})
