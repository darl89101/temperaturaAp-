const Sequelize = require('sequelize');
const sequelize = require('../database/mysqlDB');

const Parametros = sequelize.define('parametros', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    notificarcorreo: { type: Sequelize.BOOLEAN }
});

module.exports = Parametros;