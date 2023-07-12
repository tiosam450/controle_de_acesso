const botao = document.querySelector('#btnConfirmaEntrada')
function sendEmail() {
    // Verifica Campos para envio do e-mail
    var nomeV = document.querySelector('#nomeUser').value
    var cpfV = document.querySelector('#cpfEntrada').value;
    var empresaV = document.querySelector('#empresa').value
    var telefoneV = document.querySelector('#telefone').value;
    var emailV = document.querySelector('#email').value;
    var nomeUrgenciaV = document.querySelector('#nomeUrgencia').value
    var telefoneUrgenciaV = document.querySelector('#telefoneUrgencia').value;

    let endEmail = document.querySelector('#email').value
    let nomeEmail = document.querySelector('#nomeUser').value.toUpperCase()
    let corpoEmail = `
    <p>Olá ${nomeEmail}, seja bem-vindo à Line Online!</p>
    <p>Baixe o arquivo anexo e leia atentamente nosso Protocolo e Políticas de Acesso.</p>
    `
    if (nomeV != "" && cpfV != "" && empresaV != "" && telefoneV != "" && emailV != "" && nomeUrgenciaV != "" && telefoneUrgenciaV != "") {
        botao.setAttribute('value', 'Registrando entrada...')
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "",
            Password: "",
            To: endEmail,
            From: "",
            Subject: "Entrada Confirmada - Line Online",
            Body: corpoEmail,
            Attachments: [
                {
                    name: "Protocolo e Políticas de Acesso",
                    path: "https://lineonline.com.br/controledeacesso/src/download/protocolo_e_politica_controle_de_acesso_line_online.pdf"
                }]
        }).then(function (message) {
            window.location.href = './tela_de_confirmacao_2.html';
        })
    } else {
        // alert('Preencha todos os campos corretamente!')
    }
}

botao.addEventListener('click', sendEmail)
