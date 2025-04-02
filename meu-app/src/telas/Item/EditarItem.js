import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function EditarItem() {
    useVerificarAutenticacao();
    const navigate = useNavigate();

    const { CodigoBarras } = useParams(); // Aqui pegamos o Código de Barras diretamente da URL

    const [form, setForm] = useState({
        Categoria: "",
        NomeItem: "",
        PrecUnitario: "",
        QtdeEstoque: "",
        funcionario_cpf: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/editar-item/${CodigoBarras}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Item atualizado com sucesso!");
                navigate("/itens"); // Redireciona para a lista de itens
            } else {
                alert("Erro ao editar item.");
            }
        } catch (error) {
            console.error("Erro ao editar item:", error);
        }
    };

    // Carrega os dados do item ao iniciar a página
    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://localhost:5000/item/${CodigoBarras}`);
                if (response.ok) {
                    const data = await response.json();
                    setForm(data); // Preenche o formulário com os dados do item
                } else {
                    alert("Erro ao carregar os dados do item.");
                    navigate("/itens"); // Redireciona em caso de erro
                }
            } catch (error) {
                console.error("Erro ao buscar item:", error);
            }
        }
        fetchItem();
    }, [CodigoBarras, navigate]);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Editar Item</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Item</legend>
                        <input
                            type="text"
                            name="NomeItem"
                            value={form.NomeItem}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Nome do Item"
                        />
                        <input
                            type="text"
                            name="Categoria"
                            value={form.Categoria}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Categoria"
                        />
                        <input
                            type="number"
                            name="PrecUnitario"
                            value={form.PrecUnitario}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Preço Unitário"
                        />
                        <input
                            type="number"
                            name="QtdeEstoque"
                            value={form.QtdeEstoque}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Quantidade em Estoque"
                        />
                        <input
                            type="text"
                            name="funcionario_cpf"
                            value={form.funcionario_cpf}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="CPF do Funcionário"
                        />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            onClick={() => navigate("/itens")}
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

export default EditarItem;
