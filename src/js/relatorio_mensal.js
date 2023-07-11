import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"

// Pega Primeiro dia do mês
const data = new Date();
const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
const primeiroDiadoMes = primeiroDia.toLocaleDateString()

// Pega último dia do mês
const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);
const ultimoDiaDoMes = ultimoDia.toLocaleDateString()

// Array com dados dos usuarios
let usuarios = [];

var textoEnvioMensal = ""

const q = query(collection(firebaseConfig.db, 'usuariosLine'), where("dataEntrada", ">=", primeiroDiadoMes), where("dataEntrada", "<=", ultimoDiaDoMes));

getDocs(q).then(docSnap => {

    docSnap.forEach((doc) => {
        usuarios.push({ ...doc.data(), id: doc.id })

        let nomeEnvioMensal = usuarios[usuarios.length - 1]['nome'].toUpperCase()
        let cpfEnvioMensal= usuarios[usuarios.length - 1]['cpf']
        let empresaEnvioMensal = usuarios[usuarios.length - 1]['empresa'].toUpperCase()
        let telefoneEnvioMensal = usuarios[usuarios.length - 1]['telefone']
        let emailEnvioMensal = usuarios[usuarios.length - 1]['email']
        let nomeUrgenciaEnvioMensal = usuarios[usuarios.length - 1]['nomeUrgencia'].toUpperCase()
        let telefoneUrgenciaEnvioMensal = usuarios[usuarios.length - 1]['telefoneUrgencia']
        let datadeEntradaEnvio = usuarios[usuarios.length - 1]['dataEntrada']
        let horadeEntradaEnvio = usuarios[usuarios.length - 1]['horaEntrada']
        let datadeSaidaEnvio = usuarios[usuarios.length - 1]['dataSaida']
        let horadeSaidaEnvio = usuarios[usuarios.length - 1]['horaSaida']
        let tipoEnvio = usuarios[usuarios.length - 1]['tipo'].toUpperCase()

        textoEnvioMensal += `
            <b>Nome: </b>${nomeEnvioMensal} 
            <br>
            <b>CPF: </b>${cpfEnvioMensal}
            <br>
            <b>Empresa: </b>${empresaEnvioMensal}
            <br>
            <b>Telefone: </b>${telefoneEnvioMensal}
            <br>
            <b>E-mail: </b>${emailEnvioMensal}
            <br>
            <b>Nome Urgência: </b>${nomeUrgenciaEnvioMensal}
            <br>
            <b>Telefone Urgência: </b>${telefoneUrgenciaEnvioMensal}
            <br>
            <b>Data de Entrada: </b>${datadeEntradaEnvio}
            <br>
            <b>Hora de Entrada: </b>${horadeEntradaEnvio}
            <br>
            <b>Data de Saída: </b>${datadeSaidaEnvio}
            <br>
            <b>Hora de Saída: </b>${horadeSaidaEnvio}
            <br>
            <b>Tipo: </b>${tipoEnvio}
            <br>
            <hr>
            `
    })

    function enviaEmailMensal() {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "lineonlinebr1@gmail.com",
            Password: "6EF41FD1235F7E34624DCABAEF8DC596299C",
            To: "tiosam450@hotmail.com; protocolo@cobrainformatica.com; renan@cobrainformatica.com; marina@cobrainformatica.com",
            From: "protocolo@lineonline.com.br",
            Subject: "Relatorio Mensal Controle de Acesso - Line Online",
            Body: textoEnvioMensal,
        }).then(function () {
            alert('Hoje é o último dia do mês, um relatório do Controle de Acesso foi enviado para o e-mail dos administradores')
        })
    }
    // Verifica se é o último dia do mês e envia o relatório dentro de 24 horas
    setTimeout(function() {
        window.location.reload(1);

        if (data.toLocaleDateString() == ultimoDiaDoMes ) {
            enviaEmailMensal()
        }
      }, 86400000);

}).catch((erro) => {
    console.log(erro)
})


