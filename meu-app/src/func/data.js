export function formatarData(dataString) {
    // Parseia a data no formato informado
    const data = new Date(dataString);

    // Obtém os componentes da data
    const dia = data.getUTCDate(); // Obtém o dia
    const mes = data.getUTCMonth() + 1; // Obtém o mês (mês começa do 0)
    const ano = data.getUTCFullYear(); // Obtém o ano

    // Formata a data no formato "dd/mm/aaaa"
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

    return dataFormatada;
}
