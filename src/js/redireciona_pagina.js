export default function redirecionaPagina() {
    const validacao = document.querySelector('.textoTelaConfirmacao');
    if(validacao){
        setTimeout(() => {
            window.location.href = '../../index.html'
        }, 3500)

    }
}