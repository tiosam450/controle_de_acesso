const criarConta = document.querySelector('.btnCriarConta');
const body = document.querySelector('body');
const olho = document.querySelectorAll('.fa-eye');
const senha = document.querySelector('#senhaCadastro');
const confereSenha = document.querySelector('#ConfirmarSenhaCadastro');

function exibeSenha() {
    let valorSenha = document.querySelector('#senha');
        if (valorSenha.getAttribute('type') == 'password') {
            valorSenha.setAttribute('type', 'text');
        } else {
            valorSenha.setAttribute('type', 'password');
        }
}

function checkSenha() {
    if (confereSenha.value === senha.value) {
        confereSenha.setAttribute('style', 'color: green');
    } else {
        confereSenha.setAttribute('style', 'color: red');
    }
}

if (criarConta) {
    criarConta.addEventListener('click', cadastro);
}

olho.forEach(item => {
    item.addEventListener('click', exibeSenha);
})

if (confereSenha) {
    confereSenha.addEventListener('keyup', checkSenha)
}