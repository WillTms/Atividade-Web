const Sequelize = require('sequelize');
const db = require('../src/db');

const ven_pro = db.define(
    'ven_pro',{
     
        ID_VENDA: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        ID_COMPRA: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
});

ven_pro.sync();

module.exports = ven_pro;