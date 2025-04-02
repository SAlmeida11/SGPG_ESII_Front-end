import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";

import { useIdFromLocalStorage } from "../../func/getIdFromLocalStorage.js";

function VisualizarFornecedor() {
  const navigate = useNavigate();
  const cnpj = useIdFromLocalStorage('cnpj');

  const [form, setForm] = useState({
    nomeFor: "",
    cnpj: "",
    telefone: "",
    email: "",
    status: "ativo", // Definido como "ativo" por padrão
  });

  // Simulando uma requisição para obter os dados do fornecedor
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
        <h1>Visualizar Fornecedor</h1>
        <fieldset style={styles.fieldset}>
          <legend>Informações do Fornecedor</legend>
          <input
            type="text"
            name="nomeFor"
            disabled
            placeholder="Nome do Fornecedor"
            value={form.nomeFor}
            style={styles.input}
          />
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            disabled
            value={form.cnpj}
            style={styles.input}
          />
          <input
            type="text"
            name="telefone"
            disabled
            placeholder="Telefone"
            value={form.telefone}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            disabled
            placeholder="E-mail"
            value={form.email}
            style={styles.input}
          />
          <select
            name="status"
            disabled
            value={form.status}
            style={styles.input}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </fieldset>

        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={() => navigate(-1)} // Volta para a tela anterior
            style={styles.voltarButton}
          >
            ◀ Voltar
          </button>
        </div>

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
    backgroundColor: "#f5f5f5", // Deixa claro que os campos são apenas de leitura
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
  adicionarButton: {
    backgroundColor: "#008000",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default VisualizarFornecedor;
