const senhaLogin = document.querySelector('#senha');
const btnLogin = document.querySelector('#btnLogin');

function entrar() {
    if (senhaLogin.value == "bombeiro") {
        window.location.href = '../../src/html/evacuacao.html';
        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
        console.log(token)
    } else if (senhaLogin.value == "") {
        alert('Digite a senha!')
    }
    else {
        alert('Senha incorreta, tente novamente!')
    }
}

btnLogin.addEventListener('click', entrar);
