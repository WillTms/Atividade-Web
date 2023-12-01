const Sequelize = require('sequelize');
const db = require('../src/db');

const gerente = db.define(
    'gerente',{
        EMAIL: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },

        CPF: {
            type: Sequelize.VARCHAR(11),
            allowNull: false
        },
               
        SENHA: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },

        NOME_GERENTE: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },

        ID_GERENTE: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        DATA_NASCIMENTO: {
            type: Sequelize.DATE,
            allowNull: false
        },
});


gerente.sync();

module.exports = gerente;