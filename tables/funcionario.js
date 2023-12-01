/*
CRIANDO UMA TABELA NO BANCO DE DADOS.
*/
const Sequelize = require('sequelize');
const db = require('../src/db');

const funcionario = db.define(
    'funcionario',{
        ID_FUNCIONARIO: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        CPF: {
            type: Sequelize.VARCHAR(11),
            allowNull: false
        },
        EMAIL: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },
        DATA_NASCIMENTO: {
            type: Sequelize.DATE,
            allowNull: false
        },

        SENHA: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },

        NOME_FUNCIONARIO: {
            type: Sequelize.VARCHAR(200),
            allowNull: false
        },
});

//COMANDO PARA CRIAR A TABELA NO BANCO DE DADOS
funcionario.sync();

//VERIFICA SE TEM ALGUMA ALTERAÇÃO NA TABELA PARA INSERIR OS NOVOS CAMPOS
//Usuario.sync({alter: true});
module.exports = funcionario;