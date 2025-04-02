import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function EditarServico() {

    useVerificarAutenticacao();

    const id = useIdFromLocalStorage('idServico');

    const navigate = useNavigate();
    const [form, setForm] = useState({
        descricao: "",
        valor: "",
        tempoEstimado: "",
        ativo: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/servicos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Serviço editado com sucesso!");
                navigate("/servicos");
            } else {
                alert("Erro ao editar serviço.");
            }
        } catch (error) {
            console.error("Erro ao editar serviço:", error);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/servicos?${id}`)
            .then((response) => response.json())
            .then((data) => {
                setForm(data);
            })
            .catch((error) => console.error("Erro ao buscar serviços:", error));
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Editar Serviço</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Serviço</legend>
                        <input
                            type="text"
                            name="descricao"
                            placeholder="Descrição"
                            value={form.descricao}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            name="valor"
                            placeholder="Valor (R$)"
                            value={form.valor}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            name="tempoEstimado"
                            placeholder="Tempo Estimado (minutos)"
                            value={form.tempoEstimado}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <select name="ativo" value={form.ativo} onChange={handleChange} style={styles.input}>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => navigate("/servicos")} style={styles.voltarButton}>
                            ◀ Voltar
                        </button>
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
};

export default EditarServico;