let express = require('express');

let Parametros = require('../models/parametros');
var mdAutenticacion = require('../middlewares/authentication');

let app = express();

// =================================================
// Consulta los parametros
// =================================================
app.get('/', (req, res) => {

    Parametros
        .findOne()
        .then(result => {
            res.status(200).json({
                ok: true,
                parametros: result
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                err: e
            })
        });
});

// =================================================
// actualiza los parametros
// =================================================
app.put('/', (req, res) => {
    let body = req.body;

    Parametros.update({ notificarcorreo: body.notificarcorreo }, { where: { id: body.id } })
        .then(result =>
            res.status(200).json({
                ok: true,
                result
            })
        )
        .catch(err =>
            res.status(500).json({
                ok: false,
                err: err
            })
        )
        // Parametros.update({
        //         notificarcorreo: body.notificarcorreo,
        //         where: {
        //             id: body.id
        //         }
        //     })
        //     .then((temp) => {
        //         res.status(200).json({
        //             ok: true,
        //             temp
        //         })
        //     }).catch(e => {
        //         res.status(500).json({
        //             ok: false,
        //             err: e
        //         })
        //     })

});

module.exports = app;