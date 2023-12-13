const express = require('express')
const routes = express.Router()
const Equipes = require("../models/Equipes");
const Funcionario = require("../models/Funcionario");
const { Op } = require('sequelize')
const bodyParser = require('body-parser');
const Utils = require("../public/js/Utils/Utils");

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));


routes.get('/', function(req, res) {
    Equipes.findAll({
        order: [
            ['nome']
        ],
    }).then(function(equipes) {
        Funcionario.findAll({
            order: [
                ['nome']
            ],
        }).then(function(funcionarios) {
            console.log(equipes)
            res.render('equipes/equipes', { equipes: equipes, funcionarios: funcionarios })
        })
    })
})

routes.get('/deletar/:id', function(req, res) {
    Equipes.findOne({ where: { id: req.params.id }, attributes: ['nome'] }).then(function(equipes) {
        if (!equipes) {
            return res.send('Equipe não encontrada.');
        }

        Equipes.destroy({ where: { id: req.params.id } }).then(function() {
            
            res.redirect("/equipes");
        }).catch(function(erro) {
            res.send('Erro: ' + erro);
        });
    }).catch(function(erro) {
        res.send('Erro: ' + erro);
    });
});
    //Filtro para pesquisa
routes.post('/filtroPesquisa', function(req, res) {
    let pesquisa = req.body.filtroPesquisa;
    if (pesquisa == "" || null) {
        res.redirect("/equipes")
    } else {
        Equipes.findAll({
            where: {
                nome: {
                    [Op.startsWith]: pesquisa
                }
            }
        }).then(function(equipes) {
            res.render('equipes/equipes', { equipes: equipes })
        })
    }
})


ID_EDIT = 0
routes.get('/editarEquipe/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Equipes.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(equipes) {
        Funcionario.findAll({
            order: [
                ['nome']
            ],
        }).then(function(funcionarios) {
            res.render('equipes/formEquipe', { equipes: equipes, funcionarios: funcionarios })
        })
    })
});

routes.get('/visualizarEquipe/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Equipes.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(equipes) {
        Funcionario.findAll({
            order: [
                ['nome']
            ],
        }).then(function(funcionarios) {
            console.log(equipes)
            res.render('equipes/formularioVisualizarEquipe', { equipes: equipes, funcionarios: funcionarios })
        })
    })
});

routes.post('/editar', async function(req, res) {
    const dadosAnteriores = await Equipes.findOne({ where: { id: ID_EDIT } });
    const { nome, setor, funcionario1, funcionario2, funcionario3} = req.body;
    const equipeAtualizado = { nome, setor, funcionario1, funcionario2, funcionario3};

    try {
        
        const equipeComNovoNome = await Equipes.findOne({
            where: {
                nome: nome,
                id: { [Op.not]: ID_EDIT } 
            }
        });

        if (equipeComNovoNome) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe uma equipe com este nome, tente novamente!" });
            res.redirect('/equipes');
            return; 
        }

        const [rowCount] = await Equipes.update(equipeAtualizado, { where: { id: ID_EDIT } });

        if (rowCount > 0) {
            console.log(`O usuário editou o equipe '${nome}' com as seguintes alterações:`);

            for (const key in equipeAtualizado) {
                if (equipeAtualizado[key] !== dadosAnteriores[key]) {
                    console.log(`- ${key}: De "${dadosAnteriores[key]}" para "${equipeAtualizado[key]}"`);
                }
            }

            Utils.OpenPopup(req, { type: 'Sucesso', msg: "equipe atualizado com sucesso!" });
        }

        res.redirect('/equipes');
    } catch (erro) {
        Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar atualizar o equipe." });
        res.send("Erro: " + erro);
    }
});

routes.use(express.urlencoded({ extended: true }));
routes.post('/add', function(req, res) {
    Equipes.findOne({
        where: {
            nome: req.body.nome
        }
    }).then((equipe) => {
        if (equipe) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um equipe com este nome, tente novamente!" });
            res.redirect('/equipes')
        } else {
            Equipes.create({
                nome: req.body.nome,
                setor: req.body.setor,
                Responsavel: req.body.responsavel,
                FuncionarioID1: req.body.funcionario1,
                FuncionarioID2: req.body.funcionario2,
                FuncionarioID3: req.body.funcionario3
               
            }).then(function() {
                Utils.OpenPopup(req, { type: 'Sucesso', msg: "Equipe cadastrada com sucesso!" });
                res.redirect('/equipes')
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar cadastrar equipe." });
            })
            
        }
    })
})

module.exports = routes