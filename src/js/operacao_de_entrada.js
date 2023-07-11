import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"
import formataData from "./converte_data.js";
import formataHora from "./converte_hora.js";
import enviaEmail from "./envia_email.js";

// Cria novo Registro de Acesso
var dadosEmail = ''
export const entrada = () => {
    const nome = document.querySelector('#nomeUser').value.toUpperCase();
    const cpf = document.querySelector('#cpfEntrada').value;
    const empresa = document.querySelector('#empresa').value.toUpperCase();
    const telefone = document.querySelector('#telefone').value;
    const email = document.querySelector('#email').value;
    const nomeUrgencia = document.querySelector('#nomeUrgencia').value.toUpperCase();
    const telefoneUrgencia = document.querySelector('#telefoneUrgencia').value;
    const dataParaEmail = formataData() +' - ' + formataHora();

    if (nome != '' && cpf != '' && nomeUrgencia != '' && telefoneUrgencia != '') {
        addDoc(collection(firebaseConfig.db, "usuariosLine"), {
            nome: nome,
            cpf: cpf,
            empresa: empresa,
            telefone: telefone,
            email: email,
            nomeUrgencia: nomeUrgencia,
            telefoneUrgencia: telefoneUrgencia,
            dataEntrada: formataData(),
            horaEntrada: formataHora(),
            dataSaida: '',
            horaSaida: '',
            tipo: 'Visitante'
        }).then(() => {
        }).catch((erro) => {
            alert('Algo deu errado: ' + erro);
        });
    } else {
        alert('Preencha os campos corretamente!')
    }
    dadosEmail = [nome, cpf, empresa, telefone, email, nomeUrgencia, telefoneUrgencia, dataParaEmail]
}



// Botões
const btnConfirmaEntrada = document.querySelector('#btnConfirmaEntrada')

if (btnConfirmaEntrada) {
    btnConfirmaEntrada.addEventListener('click', (e) => {
        e.preventDefault();
        entrada();
    })
}