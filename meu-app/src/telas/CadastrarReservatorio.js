import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

function CadastrarReservatorio() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tipoCombustivel: "",
    capacidade: "",
    nivelAtual: "",
    temperatura: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/reservatorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Reservatório cadastrado com sucesso!");
        navigate("/reservatorios");
      } else {
        alert("Erro ao cadastrar reservatório.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar reservatório:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Reservatório</h1>
        <form onSubmit={handleSubmit}>
          <fieldset style={styles.fieldset}>
            <legend>Informações do Reservatório</legend>
            <input type="text" name="tipoCombustivel" placeholder="Tipo de Combustível" value={form.tipoCombustivel} onChange={handleChange} style={styles.input} />
            <input type="number" name="capacidade" placeholder="Capacidade (L)" value={form.capacidade} onChange={handleChange} style={styles.input} />
            <input type="number" name="nivelAtual" placeholder="Nível Atual (L)" value={form.nivelAtual} onChange={handleChange} style={styles.input} />
            <input type="text" name="temperatura" placeholder="Temperatura (°C)" value={form.temperatura} onChange={handleChange} style={styles.input} />
          </fieldset>
          
          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/reservatorios")} style={styles.voltarButton}>◀ Voltar</button>
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

export default CadastrarReservatorio;