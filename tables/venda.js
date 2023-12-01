const Sequelize = require('sequelize');
const db = require('../src/db');

const venda = db.define(
    'venda',{
        ID_USUARIO: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        VALOR_VENDA: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        NOME_PRODUTO: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },
        NOME_FUNCIONARIO: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },

        COMISSAO: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },

        ID_FUNCIONARIO: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        ID_GERENTE: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
});

venda.sync();

module.exports = venda;