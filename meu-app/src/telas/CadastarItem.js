import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

function CadastrarItem() {
  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:5000/itens", {
        method: "POST",
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

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Item</h1>
        <form onSubmit={handleSubmit}>
          <fieldset style={styles.fieldset}>
            <legend>Informações do Item</legend>
            <input
              type="text"
              name="nome"
              placeholder="Nome do Item"
              value={form.nome}
              onChange={handleChange}
              style={styles.input}
            />
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
              name="preco"
              placeholder="Preço (R$)"
              value={form.preco}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"
              value={form.quantidade}
              onChange={handleChange}
              style={styles.input}
            />
          </fieldset>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => navigate(-1)}  // Volta para a tela anterior
              style={styles.voltarButton}
            >
              ◀ Voltar
            </button>
            <button type="submit" style={styles.adicionarButton}>
              + Adicionar
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

export default CadastrarItem;
