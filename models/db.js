const Sequelize = require('sequelize')
    //conexão com o banco de dados
const sequelize = new Sequelize('pds-gerencia_facil', 'root', '!Lg23183861', {
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    query: { raw: true }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

/*const Sequelize = require('sequelize')
    //conexão com o banco de dados
const sequelize = new Sequelize('pds-gerencia_facil', 'root', '!Lg23183861', {
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    query: { raw: true }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
*/