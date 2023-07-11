function mascaraCpf(n1, n2) {
    v_obj1 = n1
    v_fun1 = n2
    execMascaraCpf()
}

function execMascaraCpf() {
    v_obj1.value = v_fun1(v_obj1.value)
}

function nCpf(n) {
    n = n.replace(/\D/g, ""); //Remove tudo o que não é dígito
    n = n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"); //Coloca . - entre os dígitos do CPF
    return n;
}

function idCpf(eb) {
    return document.getElementById(eb);
}

function initMaskCpfEntrada(){
    const id = document.querySelector('#cpfEntrada')
    if(id){
        idCpf('cpfEntrada').onkeyup = function () {
            mascaraCpf(this, nCpf);
        }
    }
}

function initMaskCpfSaida(){
    const id = document.querySelector('#cpfSaida')
    if(id){
        idCpf('cpfSaida').onkeyup = function () {
            mascaraCpf(this, nCpf);
        }
    }
}

function initMaskCpfEntradaComCadastro(){
    const id = document.querySelector('#cpfCadastrado')
    if(id){
        idCpf('cpfCadastrado').onkeyup = function () {
            mascaraCpf(this, nCpf);
        }
    }
}

function initMaskCpfEntradaColaborador(){
    const id = document.querySelector('#cpfCadastradoColaborador')
    if(id){
        idCpf('cpfCadastradoColaborador').onkeyup = function () {
            mascaraCpf(this, nCpf);
        }
    }
}

function initMaskCpfSaida(){
    const id = document.querySelector('#cpfSaida')
    if(id){
        idCpf('cpfSaida').onkeyup = function () {
            mascaraCpf(this, nCpf);
        }
    }
}

initMaskCpfEntrada();
initMaskCpfEntradaComCadastro();
initMaskCpfEntradaColaborador()
initMaskCpfSaida();