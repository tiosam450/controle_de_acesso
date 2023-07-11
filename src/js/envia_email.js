export default function enviaEmail (nome, cpf, empresa, telefone, email, nomeUrgencia, telefoneUrgencia, dataEmail) {
    const btnEnviarEmail = document.querySelector('#btnEnviarEmail')
    const nomeEmail = document.querySelector('#nomeEmail')
    const cpfEmail = document.querySelector('#cpfEmail')
    const empresaEmail = document.querySelector('#empresaEmail')
    const telefoneEmail = document.querySelector('#telefoneEmail')
    const emailEmail = document.querySelector('#emailEmail')
    const nomeUrgenciaEmail = document.querySelector('#nomeUrgenciaEmail')
    const telefoneUrgenciaEmail = document.querySelector('#telefoneUrgenciaEmail')
    const datapEmail = document.querySelector('#dataEntradaEmail')

    nomeEmail.value = nome
    cpfEmail.value = cpf
    empresaEmail.value = empresa
    telefoneEmail.value = telefone
    emailEmail.value = email
    nomeUrgenciaEmail.value = nomeUrgencia
    telefoneUrgenciaEmail.value = telefoneUrgencia
    datapEmail.value = dataEmail

    btnEnviarEmail.click()
}