import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function EditarItem() {
    useVerificarAutenticacao();
    const navigate = useNavigate();

    const id = useIdFromLocalStorage('idItem');

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        preco: "",
        quantidade: "",
        ativo: true,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/itens/${id}", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Item cadastrado com sucesso!");
                navigate("/itens");
            } else {
                alert("Erro ao cadastrar item.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar item:", error);
        }
    };

    // Carrega os dados do item ao iniciar a página
    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://localhost:5000/itens/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setForm(data);
                } else {
                    alert("Erro ao carregar os dados do item.");
                    navigate("/itens"); // Redireciona em caso de erro
                }
            } catch (error) {
                console.error("Erro ao buscar item:", error);
            }
        }
        fetchItem();
    }, [id, navigate]);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Visualizar Item</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Item</legend>
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} style={styles.input} />
                        <input type="text" name="descricao" value={form.descricao} onChange={handleChange} style={styles.input} />
                        <input type="number" name="preco" value={form.preco} onChange={handleChange} style={styles.input} />
                        <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} style={styles.input} />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => navigate("/itens")} style={styles.voltarButton}>
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

export default EditarItem;
