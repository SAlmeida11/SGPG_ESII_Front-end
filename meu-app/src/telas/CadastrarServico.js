import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

function CadastrarServico() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tempoEstimado: "",
    ativo: true,
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
        alert("Serviço cadastrado com sucesso!");
        navigate("/servicos");
      } else {
        alert("Erro ao cadastrar serviço.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Serviço</h1>
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
          </fieldset>

          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/servicos")} style={styles.voltarButton}>
              ◀ Voltar
            </button>
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
};

export default CadastrarServico;
