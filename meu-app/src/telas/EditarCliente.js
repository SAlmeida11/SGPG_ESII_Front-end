import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import verificarId from "./idLocalStorage.js";



function EditarCliente() {
    useVerificarAutenticacao();
    //const idCliente = verificarId("idCliente");

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

    /* useEffect(() => {
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
    }, []); */

    // Função para atualizar os campos do formulário
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        // Se o campo alterado for o CEP e tiver 8 dígitos, buscar endereço
        if (name === "cep" && value.length === 8) {
            buscarEndereco(value);
        }
    };

    // Função para enviar os dados do cliente para a API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                navigate("/"); // Volta para a tela de cliente
            } else {
                alert("Erro ao cadastrar cliente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
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
                    <fieldset style={styles.fieldset}>
                        <legend>Contato</legend>
                        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} style={styles.input} />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
                    </fieldset>

                    {/* Botões */}
                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => {
                            navigate("/clientes")
                            localStorage.removeItem('idCliente');
                        }} style={styles.voltarButton}>◀ Voltar</button>
                        <button type="submit" style={styles.adicionarButton}>+ Adicionar</button>
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
    adicionarButton: {
        backgroundColor: "#008000",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
}

export default EditarCliente;

