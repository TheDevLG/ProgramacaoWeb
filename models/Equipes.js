const db = require("./db");
const Funcionario = require("./Funcionario")

const Equipes = db.sequelize.define('equipe', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    Responsavel: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'funcionarios',
            key: 'id'
        }
    },
    FuncionarioID1: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'funcionarios',
            key: 'id'
        }
    },
    FuncionarioID2: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'funcionarios',
            key: 'id'
        }
    },
    FuncionarioID3: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'funcionarios',
            key: 'id'
        }
    },

    
    setor: {
        type: db.Sequelize.STRING
    },
   
});

//Equipes.sync ({force: true})

module.exports = Equipes;
