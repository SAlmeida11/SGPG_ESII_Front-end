import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function VisualizarItem() {
    useVerificarAutenticacao();
    const navigate = useNavigate();
    const { id } = useParams(); // Obtém o ID do item pela URL

    const [item, setItem] = useState({
        nome: "",
        descricao: "",
        preco: "",
        quantidade: "",
        ativo: true,
    });

    // Carrega os dados do item ao iniciar a página
    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await fetch(`http://localhost:5000/itens/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setItem(data);
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
                <form>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Item</legend>
                        <input type="text" name="nome" value={item.nome} disabled style={styles.input} />
                        <input type="text" name="descricao" value={item.descricao} disabled style={styles.input} />
                        <input type="number" name="preco" value={item.preco} disabled style={styles.input} />
                        <input type="number" name="quantidade" value={item.quantidade} disabled style={styles.input} />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => navigate("/itens")} style={styles.voltarButton}>
                            ◀ Voltar
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
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5", // Fundo cinza para indicar campo desabilitado
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-start",
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
};

export default VisualizarItem;
