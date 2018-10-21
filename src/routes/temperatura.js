let express = require('express');
let Temperatura = require('../models/temperatura');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let app = express();

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