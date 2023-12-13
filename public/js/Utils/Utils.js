class Utils {

    constructor() {

    }

    ValidacaoCriacaoUsuario(body) {

        if (body.nomeUsuario.trim() == "" || body.nomeUsuario.length < 3) {
            return { msg: "Nome de usuario deve ser maior que 3 caracteres é não pode ser vazio", status: 400, type: "Erro" }
        }

        if (body.usuarioEmail.trim() == "") {
            return { msg: "Email deve ser preenchido", status: 400, type: "Erro" }
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(body.usuarioEmail)) {
                return { msg: "Email invalido", status: 400, type: "Erro" }
            }
        }

        if (body.usuarioLogin.trim() == "" || body.usuarioLogin.length < 3) {
            return { msg: "Nome de login deve ser maior que 3 caracteres é não pode ser vazio", status: 400, type: "Erro" }
        }

        if (body.usuarioSenha.trim() == "" || body.usuarioSenha.length <= 7) {
            return { msg: "Nome de usuario deve ser maior ou igual a 8 caracteres é não pode ser vazio", status: 400, type: "Erro" }
        }

        if (body.usuarioPerfil.trim() == "" || body.usuarioPerfil.trim() == "selecioneOptions") {
            return { msg: "Perfil deve ser informado", status: 400, type: "Erro" }
        }

        if (body.usuarioPerfil.trim() == "" || body.usuarioPerfil.trim() == "selecioneOptions") {
            return { msg: "Perfil deve ser informado", status: 400, type: "Erro" }
        }

        if (!body.hasOwnProperty('deletarPermissao') && !body.hasOwnProperty('editarPermissao')) {
            return { msg: "Permissão do usuario deve ser informada", status: 400, type: "Erro" }
        }

        return { msg: "Dados confere", status: 200, type: "Sucesso" }
    }

    inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }

    OpenPopup(req, obj) {
        if (!req.session) {
            req.session = {}; // Inicializa req.session se não estiver definido
        }
        return req.session.popupMessage = {
            type: obj.type,
            message: obj.msg
        };
    }


    atualDate() {
        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = ('0' + (hoje.getMonth() + 1)).slice(-2);
        const dia = ('0' + hoje.getDate()).slice(-2);

        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    }

}

module.exports = new Utils();