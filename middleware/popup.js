const popup = (req, res, next) => {
    res.locals.flash = req.flash(); // adiciona o objeto do usuário à variável locals
    if (req.session.popupMessage) {
        res.locals.sessionPopup = true;
        res.locals.popupMessage = {
            message: req.session.popupMessage,
            color: req.session.popupMessage.type == "Erro" ? "red" : (req.session.popupMessage.type == "Aviso" ? "white" : "green")
        };
        delete req.session.popupMessage;
        delete req.session.popupType;
    } else {
        res.locals.sessionPopup = false;
        res.locals.popupMessage = null;
    }
    next();
};

module.exports = popup;