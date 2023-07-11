import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"
import formataHora from "./converte_hora.js";
import formataData from "./converte_data.js";


const cancelaOperacaoSaida = () => {
    window.location.href = './registro_de_saida.html'
}

let armazenaIdSaida = '';
const dataAtual = formataData()

export const consultaCpfSaida = () => {

    let cpfSaida = document.querySelector('#cpfSaida').value;

    if (cpfSaida != '') {

        const filtro = query(collection(firebaseConfig.db, 'usuariosLine'), where('cpf', '==', cpfSaida), where('dataEntrada', '==', dataAtual), where('dataSaida', '==', ''));

        getDocs(filtro).then(docSnap => {
            let cpfUsuarioSaida = [];
            
            docSnap.forEach((doc) => {
                cpfUsuarioSaida.push({ ...doc.data(), id: doc.id })
            })
            const mostraUsuario = document.createElement('h2');
            mostraUsuario.innerHTML = cpfUsuarioSaida[cpfUsuarioSaida.length - 1]['nome']
            mostraUsuario.style.textAlign = 'center'
            mostraUsuario.style.padding = '3rem 0'
            const exibeDados = document.querySelector('#exibeDados')
            exibeDados.appendChild(mostraUsuario)
            const btnCancelaSaida = document.querySelector('#btnCancelaSaida')

            btnBuscaCpfSaida.classList.add('none')
            btnSaida.classList.remove('none')
            btnCancelaSaida.classList.remove('none')
            btnSaida.classList.add('active')
            btnCancelaSaida.classList.add('active')

            btnCancelaSaida.addEventListener('click', cancelaOperacaoSaida)

            armazenaIdSaida = cpfUsuarioSaida[cpfUsuarioSaida.length - 1]['id'];

        }).catch((erro) => {
            alert('Não exite entrada ativa para este CPF, volte e registre sua entrada!')
            document.querySelector('#cpfSaida').value = ""
            console.log(erro)
        })
    } else {
        alert('Digite um CPF e clique em Buscar')
    }

}
const registraSaida = ()=>{
    updateDoc(doc(firebaseConfig.db, 'usuariosLine', armazenaIdSaida),{
        dataSaida: formataData(),
        horaSaida: formataHora()
    }).then(() => {
        window.location.href = './tela_de_saida.html';
    }).catch((erro) => {
        alert('Algo deu errado: ' + erro);
    });
}

// Botão
const btnSaida = document.querySelector('#btnSaida')
const btnBuscaCpfSaida = document.querySelector('#btnBuscarCpfSaida')
// const cpfSaida = document.querySelector('#cpfSaida')

if (btnBuscaCpfSaida) {
    btnBuscaCpfSaida.addEventListener('click', (e) => {
        e.preventDefault();
        consultaCpfSaida();
    })
}

if (btnSaida) {
    btnSaida.addEventListener('click', (e) => {
        e.preventDefault();
        registraSaida();
    })
}
