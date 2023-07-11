function mascaraTel(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascaraTel()", 1)
}

function execmascaraTel() {
    v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

function idTel(el) {
    return document.getElementById(el);
}

function initMaskTel() {
    idTel('telefone').onkeyup = function () {
        mascaraTel(this, mtel);
    }
}

function initMaskTel2() {
    idTel('telefoneUrgencia').onkeyup = function () {
        mascaraTel(this, mtel);
    }
}

initMaskTel()
initMaskTel2()