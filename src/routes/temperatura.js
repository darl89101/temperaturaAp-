let express = require('express');
let Temperatura = require('../models/temperatura');

let app = express();

// =================================================
// Consulta los valores de temperatura
// =================================================
app.get('/', (req, res) => {
    Temperatura.findAll().then(temperaturas => {
        res.status(200).json({
            ok: true,
            temperaturas
        })
    }).catch(e => {
        res.status(500).json({
            ok: false,
            err: e
        })
    });
});

// =================================================
// Guarda un valor de temperatura
// =================================================
app.post('/', (req, res) => {
    let body = req.body;

    Temperatura.create({
            valor: body.valor,
            fecha: new Date(),
            usuario: 1
        })
        .then((temp) => {
            res.status(200).json({
                ok: true,
                temp
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                err: e
            })
        })


});

module.exports = app;