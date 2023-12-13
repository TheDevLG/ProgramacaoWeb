const icon = document.querySelector(".c-header__icon");
const nav = document.querySelector(".c-header__nav");
const test = document.querySelector(".test");
const body = document.querySelector("body");


function navToggle() {
    nav.classList.toggle('openNavlist');
    test.classList.toggle('openTest');
    // testeBack.classList.toggle('openTestBack');
    body.classList.toggle('overflow');
}



const td = document.querySelectorAll(".colum-fixed");
for (let i = 0; i < td.length; i++){
    if (i % 2 === 0){
        td[i].style.background= 'var(--black3)';
    }else {
        td[i].style.background= 'var(--black2)';
    }
}

const btnProduct = document.querySelector(".btn__addproduct");
const testeBack = document.querySelector(".testeBack");
const sectionProduct = document.querySelector(".c-modal__addproduct");
const iconClose = document.querySelector(".ai-cross");

const backdrop = document.querySelector(".testeBack");

btnProduct.addEventListener("click", () => {
    modalToggle();
})

backdrop.addEventListener("click", () => {
    modalToggle();
});

function modalToggle() {
    testeBack.classList.toggle('openTestBack');
    sectionProduct.classList.toggle('openSectionProduct');
}

iconClose.addEventListener("click", () => {
    modalToggle();
})

function imprimirPagina() {
    window.print();
}

function confirmarExclusao(produtoId, produtoNome) {
    var resposta = confirm("Tem certeza que deseja excluir o produto '"+ produtoNome +"' ?");
    if (resposta) {
        window.location.href = "/produtos/deletar/" + produtoId;
    }
}

function confirmarExclusaoServ(servicoId, servicoNome) {
    var resposta = confirm("Tem certeza que deseja excluir o serviço '"+ servicoNome +"' ?");
    if (resposta) {
        window.location.href = "/servicos/deletar/" + servicoId;
    }
}

function confirmarExclusaoFunc(funcionarioId, funcionarioNome) {
    var resposta = confirm("Tem certeza que deseja excluir o funcionário '"+ funcionarioNome +"' ?");
    if (resposta) {
        window.location.href = "/funcionarios/deletar/" + funcionarioId;
    }
}
function confirmarExclusaoEquipe(equipeId, equipeNome) {
    var resposta = confirm("Tem certeza que deseja excluir o equipe '"+ equipeNome +"' ?");
    if (resposta) {
        window.location.href = "/equipes/deletar/" + equipeId;
    }
}

function confirmarAdd(){
    window.alert("Produto adicionado com sucesso!")
}

function confirmarAddServ(){
    window.alert("Serviço adicionado com sucesso!")
}
function isInEquipe(equipe, funcionarioId) {
    for (var i = 0; i < equipe.length; i++) {
        if (equipe[i].id === funcionarioId) {
            return true;
        }
    }
    return false;
}

// const fileInput = document.querySelector('.droparArquivo input[type=file]');
// const fileMessage = document.querySelector('.uploadMenssagem');

// fileInput.addEventListener('change', function () {
//     if (this.files.length > 0) {
//         let nomeArquivo = this.files[0].name.length > 30 ? 'Arquivo Selecionado : ' + this.files[0].name.substr(0, 30) + '...' : this.files[0].name;
//         fileMessage.innerText = nomeArquivo;
//     } else {
//         fileMessage.innerText = 'Nenhum arquivo selecionado';
//     }
// });


// function readImage() {
//     const arquivo = document.getElementById('imageEstoque').files[0];
//     const fileReader = new FileReader();
//     fileReader.onloadend = function () {
//         const base64data = fileReader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
//         document.getElementById('imageEstoqueBase64').value = base64data;
//     }
//     fileReader.readAsDataURL(arquivo);
// }