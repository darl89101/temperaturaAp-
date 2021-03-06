let express = require('express');
let bcrypt = require('bcryptjs');

let Usuario = require('../models/usuario');
var mdAutenticacion = require('../middlewares/authentication');

let app = express();

// =================================================
// Consulta los valores de temperatura
// =================================================
app.get('/', (req, res) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario
        .findAndCountAll({
            offset: desde,
            limit: 5
        })
        .then(result => {
            res.status(200).json({
                ok: true,
                total: result.count,
                usuarios: result.rows
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                err: e
            })
        });

    // Usuario.findAll().then(usuarios => {
    //     res.status(200).json({
    //         ok: true,
    //         usuarios
    //     })
    // }).catch(e => {
    //     res.status(500).json({
    //         ok: false,
    //         err: e
    //     })
    // });
});

// =================================================
// Guarda un usuario
// =================================================
app.post('/', (req, res) => {
    let body = req.body;

    Usuario.create({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), // bcrypt.genSaltSync(10),
            role: body.role
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