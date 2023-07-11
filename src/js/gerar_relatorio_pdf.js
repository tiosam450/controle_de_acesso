export default function gerarRelatorioPdf() {
    var verificaTabela = document.querySelector('#tabela');
    if (verificaTabela) {
        const btnImprimir = document.querySelector('#btnImprimir')
        const imprimir = () => {
            var tabela = document.querySelector('#tabela').innerHTML;
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

        btnImprimir.addEventListener('click', imprimir)
    }



}