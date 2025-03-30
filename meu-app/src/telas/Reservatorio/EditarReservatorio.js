import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function EditarReservatorio() {
    useVerificarAutenticacao();
    const navigate = useNavigate();

    const id = useIdFromLocalStorage('idReservatorio');


    const [form, setForm] = useState({
        tipoCombustivel: "", // aqui será o ID do combustível selecionado
        capacidade: "",
        nivelAtual: "",
        temperatura: "",
    });

    const [combustiveis, setCombustiveis] = useState([]);

    useEffect(() => {
        async function fetchCombustiveis() {
            try {
                const response = await fetch(`http://localhost:5000/combustiveis/${id}`);
                if (!response.ok) throw new Error("Erro ao buscar combustíveis");

                const data = await response.json();
                // Caso a API retorne { combustiveis: [...] }
                setCombustiveis(data.combustiveis);
            } catch (error) {
                console.error("Erro:", error);
            }
        }

        fetchCombustiveis();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/reservatorios", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Reservatório editado com sucesso!");
                navigate("/reservatorios");
            } else {
                alert("Erro ao editar reservatório.");
            }
        } catch (error) {
            console.error("Erro ao editar reservatório:", error);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Editar Reservatório</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset style={styles.fieldset}>
                        <legend>Informações do Reservatório</legend>
                        {/* Select para tipo de combustível */}
                        <select
                            name="tipoCombustivel"
                            value={form.tipoCombustivel}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="">Selecione o tipo de combustível</option>
                            {combustiveis.map((combustivel) => (
                                <option key={combustivel.id} value={combustivel.id}>
                                    {combustivel.nome}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="capacidade"
                            placeholder="Capacidade (L)"
                            value={form.capacidade}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            name="nivelAtual"
                            placeholder="Nível Atual (L)"
                            value={form.nivelAtual}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="temperatura"
                            placeholder="Temperatura (°C)"
                            value={form.temperatura}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </fieldset>

                    <div style={styles.buttonContainer}>
                        <button
                            type="button"
                            onClick={() => navigate("/reservatorios")}
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

export default EditarReservatorio;
