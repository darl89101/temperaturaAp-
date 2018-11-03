let express = require('express');
let Temperatura = require('../models/temperatura');
const Sequelize = require('sequelize');
let nodemailer = require('nodemailer');

const Op = Sequelize.Op;

let app = express();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'darl.8910@gmail.com',
        pass: 'darl8910'
    }
});

// =================================================
// Consulta los valores de temperatura
// =================================================
app.get('/', (req, res) => {
    let fini = req.query.fini;
    let ffin = req.query.ffin;
    let limit = req.query.limit;
    console.log(req.query);
    let where;
    if (fini && fini !== 'undefined') {
        where = {
            createdAt: {
                [Op.gte]: fini
            }
        };
        if (ffin && ffin !== 'undefined') {
            where = {
                createdAt: {
                    [Op.between]: [fini, ffin]
                }
            };
        }
    }
    if (!limit || limit === 'undefined') {
        limit = 20;
    }
    limit = Number(limit);
    Temperatura.findAll({
        where: where,
        order: [
            ['id', 'DESC']
        ],
        limit: limit
    }).then(temperaturas => {
        res.status(200).json({
            ok: true,
            temperaturas
        });
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

    if (Number(body.valor) > 20) {
        var mailOptions = {
            from: 'darl.8910@gmail.com',
            to: 'darl_8910@hotmail.com',
            subject: 'Alerta Temperatura',
            text: 'Temperatura registrada: ' + body.valor
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        // return;
    }

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

// function buscarTemperatura() {
//     return new Promise((resolve, reject) => {
//         Hospital.find({ nombre: regex })
//             .populate('usuario', 'nombre email')
//             .exec((err, hospitales) => {
//                 if (err) {
//                     reject('Error al cargar hospitales', err);
//                 } else {
//                     resolve(hospitales);
//                 }
//             });
//     });
// }

module.exports = app;