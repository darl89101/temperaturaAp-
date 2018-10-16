let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env.PORT = process.env.PORT | 3000;

let tempRoute = require('./src/routes/temperatura');

app.use('/temp', tempRoute);

app.listen(process.env.PORT, () => {
    console.log(`Conectado en el puerto ${process.env.PORT}`);
});