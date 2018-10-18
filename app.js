let express = require('express');
let bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);

// let io = require('socket.io')(app);

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env.PORT = process.env.PORT | 3000;

let tempRoute = require('./src/routes/temperatura');
let usuarioRoute = require('./src/routes/usuario');
let loginRoutes = require('./src/routes/login');
let imagenesRoutes = require('./src/routes/imagenes');

app.use('/login', loginRoutes);
app.use('/temp', tempRoute);
app.use('/usuario', usuarioRoute);
app.use('/img', imagenesRoutes);

let io = socketIO(server);
io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function(data) {
    //     console.log(data);
    // });
});
let Temperatura = require('./src/models/temperatura');
server.listen(process.env.PORT, () => {
    console.log('Express server escuchando en el puerto 3000: \x1b[32m%s\x1b[0m', 'conectado');


    // setInterval(() => {
    //     Temperatura.create({
    //             valor: Math.floor((Math.random() * 100) + 1),
    //             fecha: new Date(),
    //             usuario: 1
    //         })
    //         .then((temp) => {

    //         }).catch(e => {})
    // }, 200);

});