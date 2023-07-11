import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"
import formataData from "./converte_data.js";
import formataHora from "./converte_hora.js";

// Cria novo Registro de Acesso
let nomeCadastro = '';
let cpfCadastro = '';
let empresaCadastro = '';
let telefoneCadastro = '';
let emailCadastro = '';
let nomeUrgenciaCadastro = '';
let telefoneUrgenciaCadastro = '';
let dataParaEmailcc = formataData() +' - ' + formataHora();
var dadosEmailcc = ''

export const entradaColaborador = () => {
    addDoc(collection(firebaseConfig.db, "usuariosLine"), {
        nome: nomeCadastro,
        cpf: cpfCadastro,
        empresa: empresaCadastro,
        telefone: telefoneCadastro,
        email: emailCadastro,
        nomeUrgencia: nomeUrgenciaCadastro,
        telefoneUrgencia: telefoneUrgenciaCadastro,
        dataEntrada: formataData(),
        horaEntrada: formataHora(),
        dataSaida: '',
        horaSaida: '',
        tipo: 'Associado'
    }).then(() => {
        window.location.href = './tela_de_confirmacao_associado.html';
    }).catch((erro) => {
        alert('Algo deu errado: ' + erro);
    });
    dadosEmailcc = [nomeCadastro, cpfCadastro, empresaCadastro, telefoneCadastro, emailCadastro, nomeUrgenciaCadastro, telefoneUrgenciaCadastro, dataParaEmailcc]
}

const cancelaOperacao = () => {
    window.location.href = './tela_de_entrada.html'
}


let armazenaIdEntrada = '';

export const buscaCpfEntradaColaborador = () => {
    let cpfEntradaColaborador = document.querySelector('#cpfCadastradoColaborador').value;

    if (cpfEntradaColaborador != '') {

        const filtro = query(collection(firebaseConfig.db, 'usuariosLine'), where('cpf', '==', cpfEntradaColaborador), where('tipo', '==', 'Associado'));

        getDocs(filtro).then(docSnap => {
            let cpfUsuario = [];

            docSnap.forEach((doc) => {
                cpfUsuario.push({ ...doc.data(), id: doc.id })
            })
            const mostraUsuario = document.createElement('h2');
            mostraUsuario.innerHTML = cpfUsuario[cpfUsuario.length - 1]['nome'].toUpperCase()
            mostraUsuario.style.textAlign = 'center'
            mostraUsuario.style.padding = '3rem 0'
            const exibeDados = document.querySelector('#exibeDadosComCadastro')
            const btnCancelar = document.querySelector('#btnCancelar')
            exibeDados.appendChild(mostraUsuario)

            btnBuscaCpfEntradaColaborador.classList.add('none')
            btnEntradaColaborador.classList.remove('none')
            btnCancelar.classList.remove('none')
            btnEntradaColaborador.classList.add('active')
            btnCancelar.classList.add('active')

            btnCancelar.addEventListener('click', cancelaOperacao)

            armazenaIdEntrada = cpfUsuario[cpfUsuario.length - 1]['id'];
            nomeCadastro = cpfUsuario[cpfUsuario.length - 1]['nome'].toUpperCase();
            cpfCadastro = cpfUsuario[cpfUsuario.length - 1]['cpf'];
            empresaCadastro = cpfUsuario[cpfUsuario.length - 1]['empresa'].toUpperCase();
            telefoneCadastro = cpfUsuario[cpfUsuario.length - 1]['telefone'];
            emailCadastro = cpfUsuario[cpfUsuario.length - 1]['email'];
            nomeUrgenciaCadastro = cpfUsuario[cpfUsuario.length - 1]['nomeUrgencia'].toUpperCase();
            telefoneUrgenciaCadastro = cpfUsuario[cpfUsuario.length - 1]['telefoneUrgencia'];

        }).catch((erro) => {
            alert('Você não pode registrar entrada por aqui porque é um visitante ou não tem CPF cadastrado.')
            document.querySelector('#cpfCadastradoColaborador').value = ""
            console.log(erro)
        })
    } else {
        alert('Digite um CPF e clique em Buscar')
    }

}

// Botões
const btnEntradaColaborador = document.querySelector('#btnEntradaColaborador')
const btnBuscaCpfEntradaColaborador = document.querySelector('#btnBuscaCpfEntradaColaborador')

if (btnEntradaColaborador) {
    btnEntradaColaborador.addEventListener('click', (e) => {
        e.preventDefault();
        entradaColaborador();
    })
}

if (btnBuscaCpfEntradaColaborador) {
    btnBuscaCpfEntradaColaborador.addEventListener('click', (e) => {
        e.preventDefault();
        buscaCpfEntradaColaborador();
    })
}
