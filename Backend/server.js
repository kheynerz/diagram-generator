const app = require('./app')


app.set('port', 3000)



app.listen(app.get('port'), () =>{
    console.log(`Server listening on port ${app.get('port')}`);
});

app.on('error', (err) =>{
    console.log(`Error en el servidor`);
})
