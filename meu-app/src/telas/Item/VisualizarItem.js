import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function VisualizarItem() {
    useVerificarAutenticacao();
    const navigate = useNavigate();
<<<<<<< HEAD:meu-app/src/telas/VisualizarItem.js
    const { codigoBarras } = useParams();
=======

    const id = useIdFromLocalStorage('idItem');
>>>>>>> bc6af1a2d38c1964747a44b6da2180f691f1557f:meu-app/src/telas/Item/VisualizarItem.js

    const [form, setForm] = useState({
        nomeItem: "",
        codigoBarras: "",
        categoria: "",
        precoUnitario: "",
        qtdeEstoque: "",
    });

    useEffect(() => {
        async function fetchItem() {
            try {
                console.log(`Buscando item com código de barras: ${codigoBarras}`);
                const response = await fetch(`http://localhost:5000/item/${codigoBarras}`);
        
                if (response.ok) {
                    const data = await response.json();
                    console.log("Dados recebidos da API:", data);
                    setForm({
                        nomeItem: data.NomeItem || "",
                        codigoBarras: data.CodigoBarras || "",
                        categoria: data.Categoria || "",
                        precoUnitario: data.PrecUnitario ? data.PrecUnitario.toString() : "",
                        qtdeEstoque: data.QtdeEstoque ? data.QtdeEstoque.toString() : "",
                    });
                } else {
                    console.error("Erro ao carregar os dados do item:", response.status);
                    alert("Erro ao carregar os dados do item.");
                    navigate("/item");
                }
            } catch (error) {
                console.error("Erro ao buscar item:", error);
            }
        }
        fetchItem();
    }, [codigoBarras, navigate]);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Visualizar Item</h1>
                <form>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Item</legend>
                        <input type="text" name="nomeItem" value={form.nomeItem} disabled style={styles.input} />
                        <input type="text" name="codigoBarras" value={form.codigoBarras} disabled style={styles.input} />
                        <input type="text" name="categoria" value={form.categoria} disabled style={styles.input} />
                    </fieldset>

                    <fieldset style={styles.fieldset}>
                        <legend>Estoque e Preço</legend>
                        <input type="number" name="qtdeEstoque" value={form.qtdeEstoque} disabled style={styles.input} />
                        <input type="number" name="precoUnitario" value={form.precoUnitario} disabled style={styles.input} />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => navigate("/item")} style={styles.voltarButton}>
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
        backgroundColor: "#f5f5f5",
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
