export default function formataHora() {

    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    const getData = new Date();
    let horaAtualFormatada = (adicionaZero((getData.getHours()).toString()) + "h" + (adicionaZero(getData.getMinutes()).toString()));

    return (horaAtualFormatada)
}