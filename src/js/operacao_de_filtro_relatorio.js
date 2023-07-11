import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"
import formataData2 from "./converte_data_2.js";

// Filtro por data
export const consulta = () => {
    const tBody = document.querySelector('tbody');
    const dataI = document.querySelector('#dataInicial').value;
    const dataF = document.querySelector('#dataFinal').value;
    const dataInicial = formataData2(dataI);
    const dataFinal = formataData2(dataF);
    const q = query(collection(firebaseConfig.db, 'usuariosLine'), where("dataEntrada", ">=", dataInicial), where( "dataEntrada", "<=", dataFinal));
    tBody.innerHTML = '' //Limpa a tela antes de adicionar os dados

    if (dataI != '' && dataF != '') {
        getDocs(q).then(docSnap => {
            let usuarios = [];

            docSnap.forEach((doc) => {
                usuarios.push({ ...doc.data(), id: doc.id })

                const tr = document.createElement('tr');
                tBody.appendChild(tr);
                const tdNome = document.createElement('td');
                tdNome.innerHTML = usuarios[usuarios.length - 1]['nome'].toUpperCase()
                tr.appendChild(tdNome);
                const tdcpf = document.createElement('td');
                tdcpf.innerHTML = usuarios[usuarios.length - 1]['cpf']
                tr.appendChild(tdcpf);
                const tdEmpresa = document.createElement('td');
                tdEmpresa.innerHTML = usuarios[usuarios.length - 1]['empresa'].toUpperCase()
                tr.appendChild(tdEmpresa);
                const tdTel = document.createElement('td');
                tdTel.innerHTML = usuarios[usuarios.length - 1]['telefone']
                tr.appendChild(tdTel);
                const tdEmail = document.createElement('td');
                tdEmail.innerHTML = usuarios[usuarios.length - 1]['email']
                tr.appendChild(tdEmail);
                const tdNomeU = document.createElement('td');
                tdNomeU.innerHTML = usuarios[usuarios.length - 1]['nomeUrgencia'].toUpperCase()
                tr.appendChild(tdNomeU);
                const tdTelU = document.createElement('td');
                tdTelU.innerHTML = usuarios[usuarios.length - 1]['telefoneUrgencia']
                tr.appendChild(tdTelU);
                const tdDataEntrada = document.createElement('td');
                tdDataEntrada.innerHTML = usuarios[usuarios.length - 1]['dataEntrada']
                tr.appendChild(tdDataEntrada);
                const tdHoraEntrada = document.createElement('td');
                tdHoraEntrada.innerHTML = usuarios[usuarios.length - 1]['horaEntrada']
                tr.appendChild(tdHoraEntrada);
                const tdDataSaida = document.createElement('td');
                tdDataSaida.innerHTML = usuarios[usuarios.length - 1]['dataSaida']
                tr.appendChild(tdDataSaida);
                const tdHoraSaida = document.createElement('td');
                tdHoraSaida.innerHTML = usuarios[usuarios.length - 1]['horaSaida']
                tr.appendChild(tdHoraSaida);
                
                if(usuarios[usuarios.length - 1]['tipo']){
                const tdColaborador = document.createElement('td');
                tdColaborador.innerHTML = usuarios[usuarios.length - 1]['tipo'].toUpperCase()
                tr.appendChild(tdColaborador);
                }
            })
            if(dataInicial > dataFinal){
                alert("A data inicial não pode ser maior que a data final")
                document.querySelector('#dataInicial').value = "";
                
            }
            if (dataFinal < dataInicial){
                alert("A data final não pode ser menor que a data inicial")
                document.querySelector('#dataFinal').value = "";
                tBody.innerHTML = '' 
            }else if (usuarios.length === 0) {
                alert("Nenhum dado encontrado")
            }   
        }).catch((erro) => {
            console.log(erro)
        })
        

    } else if (dataI == '') {
        alert('Insira a data inicial')
    } else if (dataF == '') {
        alert('Insira a data Final')
    }
    
}

// Botões
const btnGerarRelatorio = document.querySelector('#btnGerarRelatorio')

if (btnGerarRelatorio) {
    btnGerarRelatorio.addEventListener('click', (e) => {
        e.preventDefault();
        consulta();
    })
}