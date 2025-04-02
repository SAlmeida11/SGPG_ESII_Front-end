import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";


function VisualizarCliente() {
    useVerificarAutenticacao();

    const idCliente = useIdFromLocalStorage('cpfCliente');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nomeCliente: "",
        cpf: "",
        dataNascimento: "",
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        bairro: "",
        numero: "",
        /* telefone: "",
        email: "", */
    });



    // Carregar os dados do cliente ao montar o componente
    useEffect(() => {
        async function fetchCliente() {
            try {
                const response = await fetch(`http://localhost:5000/clientes?cpf=${idCliente}`); // Exemplo de URL
                const data = await response.json();
                setForm({
                    nomeCliente: data[0].nomeCliente || "",
                    cpf: data[0].cpf || "",
                    dataNascimento: data[0].dataNascimento || "",
                    cep: data[0].cep || "",
                    cidade: data[0].cidade || "",
                    estado: data[0].estado || "",
                    logradouro: data[0].logradouro || "",
                    bairro: data[0].bairro || "",
                    numero: data[0].numero || "",
                    telefone: data[0].telefone || "",
                    email: data[0].email || "",
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
                    <input type="text" name="nomeCliente" disabled value={form.nomeCliente} style={styles.input} />
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
                {/* <fieldset style={styles.fieldset}>
                    <legend>Contato</legend>
                    <input type="text" name="telefone" disabled value={form.telefone} style={styles.input} />
                    <input type="email" name="email" disabled value={form.email} style={styles.input} />
                </fieldset> */}

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
