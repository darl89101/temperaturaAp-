const Sequelize = require('sequelize');
const sequelize = require('../database/mysqlDB');

const Temperatura = sequelize.define('temperatura', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    valor: { type: Sequelize.DECIMAL(10, 3) },
    usuario: { type: Sequelize.INTEGER }
});

module.exports = Temperatura;