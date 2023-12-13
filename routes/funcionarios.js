const express = require('express')
const routes = express.Router()
const Funcionarios = require("../models/Funcionario");
const { Op } = require('sequelize')
const bodyParser = require('body-parser');
const Utils = require("../public/js/Utils/Utils");
const { check, validationResult } = require('express-validator');

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));


routes.get('/',  function(req, res) {
    Funcionarios.findAll({
        order: [
            ['nome']
        ],
    }).then(function(funcionarios) {
            res.render('funcionarios/funcionarios', { funcionarios: funcionarios  })
        })
})

routes.get('/deletar/:id',  function(req, res) {
        Funcionarios.destroy({ where: { id: req.params.id } }).then(function() {
            Utils.OpenPopup(req, { type: 'Sucesso', msg: "Funcionário excluído com sucesso!" });
            res.redirect("/funcionarios")
        }).catch(function(erro) {
            res.send('Erro: ')
        })
    })
    //Filtro para pesquisa
    routes.post('/filtroPesquisa', function(req, res) {
        let pesquisa = req.body.filtroPesquisa;
    
        if (!pesquisa) {
            res.redirect("/funcionarios");
        } else {
            Funcionarios.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${pesquisa}%`
                    }
                }
            }).then(function(funcionarios) {
                if (funcionarios.length === 0) {
                    Utils.OpenPopup(req, { type: 'Info', msg: "Nenhum funcionário encontrado com o filtro de pesquisa." });
                    res.redirect("/funcionarios");
                } else {
                    res.render('funcionarios/funcionarios', { funcionarios: funcionarios });
                }
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao executar a pesquisa de funcionarios." });
                res.redirect("/funcionarios");
            });
        }
    });
    

//Editar servico
ID_EDIT = 0
routes.get('/editarFuncionario/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Funcionarios.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(funcionario) {
        res.render('funcionarios/formFuncionario', { funcionario: funcionario })
    })
});

routes.get('/visualizarFuncionario/:id',  function(req, res) {
    ID_EDIT = req.params.id;
    Funcionarios.findAll({
        where: {
            id: ID_EDIT
        }
    }).then(function(funcionario) {
        res.render('funcionarios/formularioVisualizarFunc', { funcionario: funcionario })
    })
});

routes.post('/editar', async function(req, res) {
    const dadosAnteriores = await Funcionarios.findOne({ where: { id: ID_EDIT } });
    const { nome, apelido, cpf, endereco, oficio, carga_horaria_semanal, email, telefone } = req.body;
    const funcionarioAtualizado = { nome, apelido, cpf, endereco, oficio, carga_horaria_semanal, email, telefone};

    try {
        
        const funcionarioComNovoNome = await Funcionarios.findOne({
            where: {
                nome: nome,
                id: { [Op.not]: ID_EDIT } 
            }
        });

        if (funcionarioComNovoNome) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um funcionario com este nome, tente novamente!" });
            res.redirect('/funcionarios');
            return; 
        }

        const [rowCount] = await Funcionarios.update(funcionarioAtualizado, { where: { id: ID_EDIT } });

        if (rowCount > 0) {
            console.log(`O usuário editou o funcionário '${nome}' com as seguintes alterações:`);

            for (const key in funcionarioAtualizado) {
                if (funcionarioAtualizado[key] !== dadosAnteriores[key]) {
                    console.log(`- ${key}: De "${dadosAnteriores[key]}" para "${funcionarioAtualizado[key]}"`);
                }
            }

            Utils.OpenPopup(req, { type: 'Sucesso', msg: "funcionário atualizado com sucesso!" });
        }

        res.redirect('/funcionarios');
    } catch (erro) {
        Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar atualizar o funcionario." });
        res.send("Erro: " + erro);
    }
});

routes.use(express.urlencoded({ extended: true }));
routes.post('/add', [
    check('cpf').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 dígitos'),
    check('email').isEmail().withMessage('E-mail inválido'),
], function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        Utils.OpenPopup(req, { type: 'Erro', msg: errors.array()[0].msg });
        res.redirect('/funcionarios');
        return;
    }
    
    Funcionarios.findOne({
        where: {
            nome: req.body.nome
        }
    }).then((funcionario) => {
        if (funcionario) {
            Utils.OpenPopup(req, { type: 'Erro', msg: "Já existe um funcionário com este nome, tente novamente!" });
            res.redirect('/funcionarios')
        } else {
            Funcionarios.create({
                nome: req.body.nome,
                apelido : req.body.apelido,
                cpf : req.body.cpf,
                endereco: req.body.endereco,
                oficio: req.body.oficio,
                carga_horaria_semanal: req.body.carga_horaria,
                email: req.body.email,
                telefone: req.body.telefone

            }).then(function() {
                Utils.OpenPopup(req, { type: 'Sucesso', msg: "Funcionário cadastrado com sucesso!" });
                res.redirect('/funcionarios')
            }).catch(function(erro) {
                Utils.OpenPopup(req, { type: 'Erro', msg: "Erro ao tentar cadastrar funcionário." });
            })
            console.log("O funcionário '" + req.body.nome + "' foi adicionado")
            
        }
    })
})


module.exports = routes