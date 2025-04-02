export function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    cpf = cpf.slice(0, 11); // Limita a 11 dígitos

    cpf = cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf
}

export function unformatCPF(cpf) {
    return cpf.replace(/\D/g, "");
}