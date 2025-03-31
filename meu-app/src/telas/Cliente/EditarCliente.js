import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVerificarAutenticacao from "../autenticacao";
import Sidebar from "../../components/Sidebar/menu.js";

import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";
import { formatarCPF, unformatCPF } from "../../func/cpf.js";

function EditarCliente() {
    useVerificarAutenticacao();
    const idCliente = useIdFromLocalStorage('cpfCliente');

    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        bairro: "",
        numero: "",
    });

    useEffect(() => {
        async function fetchCliente() {
            try {
                const response = await fetch(`http://localhost:5000/clientes?cpf=${idCliente}`); // Exemplo de URL
                const data = await response.json();
                setForm({
                    nome: data[0].nome || "",
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

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        let fieldValue = e.target.value;

        if (e.target.name === "cpf") {
            fieldValue = formatarCPF(fieldValue);
        }

        setForm({ ...form, [e.target.name]: fieldValue });
        const { name, value } = e.target;
        // Se o campo alterado for o CEP e tiver 8 dígitos, buscar endereço
        if (name === "cep" && value.length === 8) {
            buscarEndereco(value);
        }
    };

    // Função para enviar os dados do cliente para a API
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formCopy = { ...form };
        formCopy.cpf = unformatCPF(formCopy.cpf);

        try {
            const response = await fetch(`http://localhost:5000/clientes`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formCopy),
            });

            if (response.ok) {
                alert("Cliente editado com sucesso!");
                navigate("/clientes"); // Volta para a tela de cliente
            } else {
                alert("Erro ao editar cliente.");
            }
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
        }
    };

    // Função para buscar endereço pelo ViaCEP
    const buscarEndereco = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setForm((prevForm) => ({
                    ...prevForm,
                    logradouro: data.logradouro || "",
                    bairro: data.bairro || "",
                    cidade: data.localidade || "",
                    estado: data.uf || "",
                }));
            } else {
                alert("CEP não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            alert("Erro ao buscar o CEP. Tente novamente.");
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Editar Cliente</h1>
                <form onSubmit={handleSubmit}>
                    {/* Seção: Informações Pessoais */}
                    <fieldset style={styles.fieldset}>
                        <legend>Informações Pessoais</legend>
                        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={styles.input} />
                        <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} style={styles.input} />
                        <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={form.dataNascimento} onChange={handleChange} style={styles.input} />
                    </fieldset>

                    {/* Seção: Endereço */}
                    <fieldset style={styles.fieldset}>
                        <legend>Endereço</legend>
                        <input type="text" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} style={styles.input} />
                        <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} style={styles.input} />
                        <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} style={styles.input} />
                        <input type="text" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} style={styles.input} />
                        <input type="text" name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} style={styles.input} />
                        <input type="text" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} style={styles.input} />
                    </fieldset>

                    {/* Seção: Contato */}
                    {/* <fieldset style={styles.fieldset}>
                        <legend>Contato</legend>
                        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} style={styles.input} />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
                    </fieldset> */}

                    {/* Botões */}
                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => {
                            navigate("/clientes")
                            localStorage.removeItem('idCliente');
                        }} style={styles.voltarButton}>◀ Voltar</button>
                        <button type="submit" style={styles.salvarButton}>Salvar</button>
                    </div>
                </form>
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
    },
    input: {
        width: "30%",
        padding: "8px",
        margin: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    voltarButton: {
        backgroundColor: "#ccc",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    salvarButton: {
        backgroundColor: "#008000",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
}

export default EditarCliente;

