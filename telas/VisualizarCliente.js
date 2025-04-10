import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./menu.js";
import verificarId from "./idLocalStorage.js";
import useVerificarAutenticacao from "./autenticacao.js";




function VisualizarCliente() {
    // const idCliente = verificarId('idCliente');
    useVerificarAutenticacao();

    const idCliente = 1;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "João Silva",
        cpf: "123.456.789-00",
        dataNascimento: "1990-05-12",
        cep: "01001-000",
        cidade: "São Paulo",
        estado: "SP",
        logradouro: "Rua das Flores",
        bairro: "Centro",
        numero: "123",
        telefone: "(11) 98765-4321",
        email: "joao.silva@email.com"
    });

    // Carregar os dados do cliente ao montar o componente
    useEffect(() => {
        async function fetchCliente() {
            try {
                const response = await fetch(`http://localhost:5000/clientes?cpfCliente=${idCliente}`); // Exemplo de URL
                const data = await response.json();
                setForm({
                    nome: data.nome || "",
                    cpf: data.cpf || "",
                    dataNascimento: data.dataNascimento || "",
                    cep: data.cep || "",
                    cidade: data.cidade || "",
                    estado: data.estado || "",
                    logradouro: data.logradouro || "",
                    bairro: data.bairro || "",
                    numero: data.numero || "",
                    telefone: data.telefone || "",
                    email: data.email || "",
                });
            } catch (error) {
                console.error("Erro ao buscar cliente:", error);
            }
        }

        fetchCliente();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Visualizar Cliente</h1>

                {/* Seção: Informações Pessoais */}
                <fieldset style={styles.fieldset}>
                    <legend>Informações Pessoais</legend>
                    <input type="text" name="nome" disabled value={form.nome} style={styles.input} />
                    <input type="text" name="cpf" disabled value={form.cpf} style={styles.input} />
                    <input type="date" name="dataNascimento" disabled value={form.dataNascimento} style={styles.input} />
                </fieldset>

                {/* Seção: Endereço */}
                <fieldset style={styles.fieldset}>
                    <legend>Endereço</legend>
                    <input type="text" name="cep" disabled value={form.cep} style={styles.input} />
                    <input type="text" name="cidade" disabled value={form.cidade} style={styles.input} />
                    <input type="text" name="estado" disabled value={form.estado} style={styles.input} />
                    <input type="text" name="logradouro" disabled value={form.logradouro} style={styles.input} />
                    <input type="text" name="bairro" disabled value={form.bairro} style={styles.input} />
                    <input type="text" name="numero" disabled value={form.numero} style={styles.input} />
                </fieldset>

                {/* Seção: Contato */}
                <fieldset style={styles.fieldset}>
                    <legend>Contato</legend>
                    <input type="text" name="telefone" disabled value={form.telefone} style={styles.input} />
                    <input type="email" name="email" disabled value={form.email} style={styles.input} />
                </fieldset>

                {/* Botão de Voltar */}
                <div style={styles.buttonContainer}>
                    <button type="button" onClick={() => {
                        navigate(-1)
                        localStorage.removeItem('idCliente');
                    }} style={styles.voltarButton}>
                        ◀ Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    fieldset: {
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        gap: "15px",

    },
    input: {
        width: "30%",
        padding: "8px",
        margin: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f5f5f5",
        color: "#555",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "20px",
    },
    voltarButton: {
        backgroundColor: "#ccc",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default VisualizarCliente;
