    const express = require('express');
    const app = express();
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser')
    const cookieParser = require("cookie-parser");
    const produtos = require('./routes/produtos')
    const servicos = require('./routes/servicos')
    const session = require("express-session")
    const Utils = require("./public/js/Utils/Utils");
    const { popup } = require("./middleware/index");
    const flash = require("connect-flash");
    const funcionarios = require('./routes/funcionarios')
    const equipes = require('./routes/equipes')
    
    require('dotenv').config()
    app.use(cookieParser());

     //SESSÃO
     app.use(session({
        secret: 'chave',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    //MIDDLEWARE
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.flash = req.flash(); // adiciona o objeto do usuário à variável locals
        next();
    })

    app.use(popup);


    //MENSAGENS
    app.use(flash())
    
   // Template Engine
   app.engine('handlebars', handlebars.engine({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
   app.set('view engine', 'handlebars');

    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    app.use(bodyParser.json())

    //ROTAS
    app.get('/', (req, res) => res.render('home'));
    app.get('/home', (req, res) => res.render('home'));
    
    app.use('/equipes', equipes)
    app.use('/funcionarios', funcionarios);
    app.use('/produtos', produtos);
    app.use('/servicos', servicos);
    //

    app.use(express.static('public'));
    app.use(express.static('assets'));
    
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
   
    // Configuração para servir arquivos estáticos
        app.use('/public', express.static('public'));

    app.listen(3000, function(){
    console.log('tudo certo!')
})