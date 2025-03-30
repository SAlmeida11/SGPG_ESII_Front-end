import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";

function EditarFornecedor() {
    useVerificarAutenticacao();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nomeFor: "",
        cnpj: "",
        telefone: "",
        email: "",
        status: "ativo", // Definido como "ativo" por padrão
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/fornecedores", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Fornecedor editado com sucesso!");
                navigate("/fornecedores");
            } else {
                alert("Erro ao editar fornecedor.");
            }
        } catch (error) {
            console.error("Erro ao editar fornecedor:", error);
        }
    };

    useEffect(() => {
        async function fetchFornecedor() {
            try {
                const response = await fetch(`http://localhost:5000/fornecedores?cnpj=${cnpj}`);
                const data = await response.json();
                setForm({
                    nomeFor: data.nomeFor || "",
                    cnpj: data.cnpj || "",
                    telefone: data.telefone || "",
                    email: data.email || "",
                    status: data.status || "ativo",
                });
            } catch (error) {
                alert("Erro ao buscar fornecedor");
                console.log(error);
            }
        }

        fetchFornecedor();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Editar Fornecedor</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Fornecedor</legend>
                        <input
                            type="text"
                            name="nomeFor"
                            placeholder="Nome do Fornecedor"
                            value={form.nomeFor}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="cnpj"
                            placeholder="CNPJ"
                            value={form.cnpj}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={form.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            onClick={() => navigate(-1)} // Volta para a tela anterior
                            style={styles.voltarButton}
                        >
                            ◀ Voltar
                        </button>
                        <button type="submit" style={styles.salvarButton}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    fieldset: {
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
    },
    input: {
        width: "45%",
        padding: "12px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
        boxSizing: "border-box",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    voltarButton: {
        backgroundColor: "#ccc",
        border: "none",
        padding: "12px 25px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
    salvarButton: {
        backgroundColor: "#008000",
        color: "white",
        border: "none",
        padding: "12px 25px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default EditarFornecedor;
