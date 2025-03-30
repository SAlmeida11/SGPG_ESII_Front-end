import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function VisualizarFuncionario() {
    useVerificarAutenticacao();
    const navigate = useNavigate();
    const idFuncionario = useIdFromLocalStorage('idFuncionario');


    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        numero: "",
        telefone: "",
        email: "",
        dataContratacao: "",
        salario: "",
        administrador: "NAO",
    });

    // Carrega os dados do funcionário ao iniciar a página
    useEffect(() => {
        async function fetchFuncionario() {
            try {
                const response = await fetch(`http://localhost:5000/funcionarios/${idFuncionario}`);
                if (response.ok) {
                    const data = await response.json();
                    setForm(data);
                } else {
                    alert("Erro ao carregar os dados do funcionário.");
                    navigate("/funcionarios"); // Redireciona em caso de erro
                }
            } catch (error) {
                console.error("Erro ao buscar funcionário:", error);
            }
        }
        fetchFuncionario();
    }, [idFuncionario, navigate]);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
                <h1>Visualizar Funcionário</h1>
                <form>
                    {/* Seção: Informações Pessoais */}
                    <fieldset style={styles.fieldset}>
                        <legend>Informações Pessoais</legend>
                        <input type="text" name="nome" value={form.nome} disabled style={styles.input} />
                        <input type="text" name="cpf" value={form.cpf} disabled style={styles.input} />
                        <input type="date" name="dataNascimento" value={form.dataNascimento} disabled style={styles.input} />
                    </fieldset>

                    {/* Seção: Endereço */}
                    <fieldset style={styles.fieldset}>
                        <legend>Endereço</legend>
                        <input type="text" name="cep" value={form.cep} disabled style={styles.input} />
                        <input type="text" name="cidade" value={form.cidade} disabled style={styles.input} />
                        <input type="text" name="estado" value={form.estado} disabled style={styles.input} />
                        <input type="text" name="logradouro" value={form.logradouro} disabled style={styles.input} />
                        <input type="text" name="numero" value={form.numero} disabled style={styles.input} />
                    </fieldset>

                    {/* Seção: Contato */}
                    <fieldset style={styles.fieldset}>
                        <legend>Contato</legend>
                        <input type="text" name="telefone" value={form.telefone} disabled style={styles.input} />
                        <input type="email" name="email" value={form.email} disabled style={styles.input} />
                    </fieldset>

                    {/* Seção: Contrato */}
                    <fieldset style={styles.fieldset}>
                        <legend>Contrato</legend>
                        <input type="date" name="dataContratacao" value={form.dataContratacao} disabled style={styles.input} />
                        <input type="number" name="salario" value={form.salario} disabled style={styles.input} />
                        <select name="administrador" value={form.administrador} disabled style={styles.input}>
                            <option value="NAO">Padrão</option>
                            <option value="SIM">Administrador</option>
                        </select>
                    </fieldset>

                    {/* Botão de Voltar */}
                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={() => navigate("/funcionarios")} style={styles.voltarButton}>
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

export default VisualizarFuncionario;
