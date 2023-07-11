import { getFirestore, setDoc, addDoc, getDoc, getDocs, updateDoc, query, deleteDoc, doc, where, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import * as firebaseConfig from "./firebase_config.js"
import formataData from "./converte_data.js";
import formataData3 from "./converte_data_3.js";

// Insere a data atual no input data
if (document.querySelector('#formRelatorioEvacuacao')) {
    var dataDeEvacuacao = formataData().toString()
    var dataDeEvacuacaoF = formataData3(dataDeEvacuacao)
    document.querySelector('#dataInicialE').value = dataDeEvacuacaoF
    document.querySelector('#dataFinalE').value = dataDeEvacuacaoF
}

// Array com dados dos usuarios
let usuarios = [];

var textoEmail = ""

export const consultaEvacuacao = () => {
    const tBody = document.querySelector('tbody');
    const q = query(collection(firebaseConfig.db, 'usuariosLine'), where("dataEntrada", "==", dataDeEvacuacao));

    getDocs(q).then(docSnap => {

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
            const tdTipo = document.createElement('td');
            tdTipo.innerHTML = usuarios[usuarios.length - 1]['tipo'].toUpperCase()
            tr.appendChild(tdTipo);

            // Envia Email
            let nomeEvacuacao = usuarios[usuarios.length - 1]['nome'].toUpperCase()
            let cpfEvacuacao = usuarios[usuarios.length - 1]['cpf']
            let empresaEvacuacao = usuarios[usuarios.length - 1]['empresa'].toUpperCase()
            let telefoneEvacuacao = usuarios[usuarios.length - 1]['telefone']
            let emailEvacuacao = usuarios[usuarios.length - 1]['email']
            let nomeUrgenciaEvacuacao = usuarios[usuarios.length - 1]['nomeUrgencia'].toUpperCase()
            let telefoneUrgenciaEvacuacao = usuarios[usuarios.length - 1]['telefoneUrgencia']

            textoEmail += `
            <b>Nome: </b>${nomeEvacuacao} 
            <br>
            <b>CPF: </b>${cpfEvacuacao}
            <br>
            <b>Empresa: </b>${empresaEvacuacao}
            <br>
            <b>Telefone: </b>${telefoneEvacuacao}
            <br>
            <b>E-mail: </b>${emailEvacuacao}
            <br>
            <b>Nome Urgência: </b>${nomeUrgenciaEvacuacao}
            <br>
            <b>Telefone Urgência: </b>${telefoneUrgenciaEvacuacao}
            <br>
            <hr>
            `
        })

        function enviaEmailEvacuacao() {
            Email.send({
                Host: "smtp.elasticemail.com",
                Username: "lineonlinebr1@gmail.com",
                Password: "6EF41FD1235F7E34624DCABAEF8DC596299C",
                To: "tiosam450@hotmail.com; renan@cobrainformatica.com; marina@cobrainformatica.com; renali@lineonline.com.br; denis@lineonline.com.br",
                From: "protocolo@lineonline.com.br",
                Subject: "Relatorio de Evacuação - Line Online",
                Body: textoEmail,
            }).then(function(){
                window.location.href = './tela_de_confirmacao_3.html';
                localStorage.removeItem('token');
            })
        }

        // IMPRIME RELATÓRIO DE EVACUAÇÃO
        const btnImprimirEvacuacao = document.querySelector('#btnImprimirEvacuacao')
        const imprimirEvacuacao = () => {
            var tabela = document.querySelector('#tabelaEvacuacao').innerHTML;
            var style = "<style>";
            style = style + "table {width: 100%;font: 8px Calibri;}";
            style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
            style = style + "padding: 2px 3px;text-align: center;}";
            style = style + "</style>";

            // CRIA UM OBJETO WINDOW
            var win = window.open('', '', 'height=700,width=700');
            win.document.write('<html><head>');
            win.document.write('<title>Relatório de Acesso</title>'); // <title> CABEÇALHO DO PDF
            win.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
            win.document.write('</head>');
            win.document.write('<body>');
            win.document.write(tabela);
            win.document.write('</body></html>');
            win.document.close();
            win.print(); // IMPRIME O CONTEUDO
        }
        
        btnImprimirEvacuacao.addEventListener('click', function(e){
            e.preventDefault();
            enviaEmailEvacuacao()
            // imprimirEvacuacao()
        })


    }).catch((erro) => {
        console.log(erro)
    })
}


if (document.querySelector('#formRelatorioEvacuacao')) {
    consultaEvacuacao();
}