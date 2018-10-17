const Sequelize = require('sequelize');
const sequelize = require('../database/mysqlDB');

const Usuario = sequelize.define('usuario', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    img: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING }
});

module.exports = Usuario;