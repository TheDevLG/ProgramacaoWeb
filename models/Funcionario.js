const db = require("./db");
const Equipes = require("./Equipes")

const Funcionarios = db.sequelize.define('funcionario', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    apelido: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.BIGINT
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    oficio: {
        type: db.Sequelize.STRING
    },
    carga_horaria_semanal: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.BIGINT
    }

    
})



//Funcionarios.sync ({force: true})

module.exports = Funcionarios