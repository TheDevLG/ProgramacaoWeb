const express = require('express')
const routes = express.Router()
const Produtos = require("../models/Produtos");
const { Op } = require('sequelize')
const bodyParser = require('body-parser');
const Utils = require("../public/js/Utils/Utils");


routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));


routes.get('/',  function(req, res) {
    Produtos.findAll({
        order: [
            ['nome']
        ],
    }).then(function(produtos) {
            res.render('produtos/produtos', { produtos: produtos  })
        })
})

routes.get('/deletar/:id',  function(req, res) {
        Produtos.destroy({ where: { id: req.params.id } }).then(function() {
            Utils.OpenPopup(req, { type: 'Sucesso', msg: "Produto excluído com sucesso!" });
            res.redirect("/produtos")
        }).catch(function(erro) {
            res.send('Erro: ')
        })
    })
    //Filtro para pesquisa
    routes.post('/filtroPesquisa', function(req, res) {
        let pesquisa = req.body.filtroPesquisa;
    
        if (!pesquisa) {
            res.redirect("/produtos");
        } else {
            Produtos.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${pesquisa}%`
                    }
                }
            }).then(function(produtos) {
                if (produtos.length === 0) {
                    Utils.OpenPopup(req, { type: 'Info', msg: "Nenhum produto encontrado com o filtro de pesquisa." });
                    res.redirect("/produtos");
                } else {
                    res.render('produtos/produtos', { produtos: produtos });
                }
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao executar a pesquisa de produtos." });
                res.redirect("/produtos");
            });
        }
    });

//Editar Produto
ID_EDIT = 0
routes.get('/editarProduto/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Produtos.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(produto) {
        res.render('produtos/formulario', { produto: produto })
    })
});

routes.get('/visualizarProduto/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Produtos.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(produto) {
        res.render('produtos/formularioVisualizar', { produto: produto })
    })
});
routes.post('/editar', async function(req, res) {
    const dadosAnteriores = await Produtos.findOne({ where: { id: ID_EDIT } });
    const { nome, categoria } = req.body;
    const produtoAtualizado = { nome, categoria };

    try {
        
        const produtoComNovoNome = await Produtos.findOne({
            where: {
                nome: nome,
                id: { [Op.not]: ID_EDIT } 
            }
        });

        if (produtoComNovoNome) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um produto com este nome, tente novamente!" });
            res.redirect('/produtos');
            return; 
        }

        const [rowCount] = await Produtos.update(produtoAtualizado, { where: { id: ID_EDIT } });

        if (rowCount > 0) {
            console.log(`O usuário editou o produto '${nome}' com as seguintes alterações:`);

            for (const key in produtoAtualizado) {
                if (produtoAtualizado[key] !== dadosAnteriores[key]) {
                    console.log(`- ${key}: De "${dadosAnteriores[key]}" para "${produtoAtualizado[key]}"`);
                }
            }

            Utils.OpenPopup(req, { type: 'Sucesso', msg: "Produto atualizado com sucesso!" });
        }

        res.redirect('/produtos');
    } catch (erro) {
        Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar atualizar o produto." });
        res.send("Erro: " + erro);
    }
});


routes.use(express.urlencoded({ extended: true }));
routes.post('/add',  function(req, res) {
    Produtos.findOne({
        where: {
            nome: req.body.nome
        }
    }).then((produto) => {
        if (produto) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um produto com este nome, tente novamente!" });
            res.redirect('/produtos')
        } else {
            Produtos.create({
                nome: req.body.nome,
                categoria : req.body.categoria
            }).then(function() {
                Utils.OpenPopup(req, { type: 'Sucesso', msg: "Produtro cadastrado com sucesso!" });
                res.redirect('/produtos')
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar cadastrar produto." });
            })
            console.log("O produto '" + req.body.nome + "' foi adicionado")
            
        }
    })
})


module.exports = routes