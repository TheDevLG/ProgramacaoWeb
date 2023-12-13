const db = require("./db")

const Servicos = db.sequelize.define('servico', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    tipo: {
        type: db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.DECIMAL
    }
})

//Servicos.sync ({force: true})

module.exports = Servicos