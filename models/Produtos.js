const db = require("./db")

const Produtos = db.sequelize.define('produto', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    categoria: {
        type: db.Sequelize.STRING
    },
    

})

//Produtos.sync ({force: true})

module.exports = Produtos