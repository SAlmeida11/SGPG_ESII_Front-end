import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";

function CadastrarCombustivel() {
  useVerificarAutenticacao();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    preco_litro: "",
    categoria: "",
    quantidade_disponivel: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/combustiveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Combustível cadastrado com sucesso!");
        navigate("/combustiveis");
      } else {
        alert("Erro ao cadastrar combustível.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar combustível:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Combustível</h1>
        <form onSubmit={handleSubmit}>
          <fieldset style={styles.fieldset}>
            <legend>Informações do Combustível</legend>
            <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={styles.input} />
            <input type="number" name="preco_litro" placeholder="Preço por Litro" value={form.preco_litro} onChange={handleChange} style={styles.input} />
            <input type="text" name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} style={styles.input} />
            <input type="number" name="quantidade_disponivel" placeholder="Quantidade Disponível (L)" value={form.quantidade_disponivel} onChange={handleChange} style={styles.input} />
          </fieldset>

          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/combustiveis")} style={styles.voltarButton}>◀ Voltar</button>
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

export default CadastrarCombustivel;