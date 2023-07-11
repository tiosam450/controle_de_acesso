export default function formataData(){

    // function adicionaZero(numero){
    //     if (numero <= 9) 
    //         return "0" + numero;
    //     else
    //         return numero; 
    // }

    // const getData = new Date();
    // let dataAtualFormatada = (adicionaZero((getData.getDate()).toString()) + "/" + (adicionaZero(getData.getMonth()+1).toString()) + "/" + getData.getFullYear());
    const getData = new Date();
    let dataAtualFormatada = Intl.DateTimeFormat('pt-BR',{dataStyle: 'short',});
    const data = dataAtualFormatada.format(getData)
   
    return(data)
}