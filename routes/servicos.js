const express = require('express')
const routes = express.Router()
const Servicos = require("../models/Servicos");
const { Op } = require('sequelize')
const bodyParser = require('body-parser');
const Utils = require("../public/js/Utils/Utils");


routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));


routes.get('/',  function(req, res) {
    Servicos.findAll({
        order: [
            ['nome']
        ],
    }).then(function(servicos) {
            res.render('servicos/servicos', { servicos: servicos  })
        })
})

routes.get('/deletar/:id',  function(req, res) {
        Servicos.destroy({ where: { id: req.params.id } }).then(function() {
            Utils.OpenPopup(req, { type: 'Sucesso', msg: "Serviço excluído com sucesso!" });
            res.redirect("/servicos")
        }).catch(function(erro) {
            res.send('Erro: ')
        })
    })
    //Filtro para pesquisa

    routes.post('/filtroPesquisa', function(req, res) {
        let pesquisa = req.body.filtroPesquisa;
    
        if (!pesquisa) {
            res.redirect("/servicos");
        } else {
            Servicos.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${pesquisa}%`
                    }
                }
            }).then(function(servicos) {
                if (servicos.length === 0) {
                    Utils.OpenPopup(req, { type: 'Info', msg: "Nenhum serviço encontrado com o filtro de pesquisa." });
                    res.redirect("/servicos");
                } else {
                    res.render('servicos/servicos', { servicos: servicos });
                }
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao executar a pesquisa de serviços." });
                res.redirect("/servicos");
            });
        }
    });
    

//Editar servico
ID_EDIT = 0
routes.get('/editarServico/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Servicos.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(servico) {
        res.render('servicos/formServico', { servico: servico })
    })
});
routes.get('/visualizarServico/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Servicos.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(servico) {
        res.render('servicos/formularioVisualizarServ', { servico: servico })
    })
});

routes.post('/editar', async function(req, res) {
    const dadosAnteriores = await Servicos.findOne({ where: { id: ID_EDIT } });
    const { nome, tipo, valor } = req.body;
    const servicoAtualizado = { nome, tipo, valor };

    try {
        
        const servicoComNovoNome = await Servicos.findOne({
            where: {
                nome: nome,
                id: { [Op.not]: ID_EDIT } 
            }
        });

        if (servicoComNovoNome) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um serviço com este nome, tente novamente!" });
            res.redirect('/servicos');
            return; 
        }

        const [rowCount] = await Servicos.update(servicoAtualizado, { where: { id: ID_EDIT } });

        if (rowCount > 0) {
            console.log(`O usuário editou o serviço '${nome}' com as seguintes alterações:`);

            for (const key in servicoAtualizado) {
                if (servicoAtualizado[key] !== dadosAnteriores[key]) {
                    console.log(`- ${key}: De "${dadosAnteriores[key]}" para "${servicoAtualizado[key]}"`);
                }
            }

            Utils.OpenPopup(req, { type: 'Sucesso', msg: "serviço atualizado com sucesso!" });
        }

        res.redirect('/servicos');
    } catch (erro) {
        Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar atualizar o servico." });
        res.send("Erro: " + erro);
    }
});

routes.use(express.urlencoded({ extended: true }));
routes.post('/add',  function(req, res) {
    Servicos.findOne({
        where: {
            nome: req.body.nome
        }
    }).then((servico) => {
        if (servico) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um serviço com este nome, tente novamente!" });
            res.redirect('/servicos')
        } else {
            Servicos.create({
                nome: req.body.nome,
                tipo : req.body.tipo,
                valor : req.body.valor
            }).then(function() {
                Utils.OpenPopup(req, { type: 'Sucesso', msg: "Serviço cadastrado com sucesso!" });
                res.redirect('/servicos')
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar cadastrar serviço." });
            })
            console.log("O serviço '" + req.body.nome + "' foi adicionado")
            
        }
    })
})


module.exports = routes