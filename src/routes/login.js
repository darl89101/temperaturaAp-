var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

var mdAutenticacion = require('../middlewares/authentication');

// =================================================
// Verificar Token
// =================================================
app.get('/renuevaToken', mdAutenticacion.verificaToken, (req, res) => {
    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }); // 4 horas
    res.status(200).json({
        ok: true,
        // usuario: req.usuario,
        token
    });

});


// =================================================
// Autenticacion normal
// =================================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ where: { email: body.email } })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Credenciales Incorrectas', // `Error al consultar usuario con email ${body.email}`,
                    errors: {
                        message: 'Credenciales Incorrectas' // 'No existe un usuario con ese email'
                    }
                });
            }
            if (!bcrypt.compareSync(body.password, usuario.password)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales Incorrectas',
                    errors: {
                        mensaje: 'Credenciales Incorrectas'
                    }
                });
            }
            // Crear Token!!!!
            usuario.password = ':)';
            var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); // 4 horas
            res.status(200).json({
                ok: true,
                usuario: usuario,
                token: token,
                id: usuario.id,
                menu: obtenermenu(usuario.role)
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error consultando usuario',
                errors: err
            });
        });
});

function obtenermenu(ROLE) {
    var menu = [{
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
            { titulo: 'Dashboard', url: '/dashboard' },
            // { titulo: 'Progressbar', url: '/progress' },
            // { titulo: 'Gráficas', url: '/graficas1' },
            // { titulo: 'Promesas', url: '/promesas' },
            // { titulo: 'RxJs', url: '/rxjs' }
        ]
    }, {
        titulo: 'Mantenimientos',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
            // { titulo: 'Usuarios', url: '/usuarios' },
            // { titulo: 'Hospitales', url: '/hospitales' },
            // { titulo: 'Médicos', url: '/medicos' }
        ]
    }];
    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }
    return menu;
}

module.exports = app;