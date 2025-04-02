import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function CadastrarFuncionario() {
  useVerificarAutenticacao();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    logradouro: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    dtContratacao: "",
    salario: "",
  });

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Enviar os dados do funcionário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Enviando dados:", JSON.stringify(form)); // Debug

    try {
      const response = await fetch("http://localhost:5000/cadfuncionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
        navigate("/funcionarios");
      } else {
        alert("Erro ao cadastrar funcionário: " + (data.mensagem || "Verifique os dados enviados."));
      }
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Funcionário</h1>
        <form onSubmit={handleSubmit}>
          {/* Informações Pessoais */}
          <fieldset style={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={styles.input} required />
            <input type="text" name="cpf" placeholder="CPF (123.456.789-00)" value={form.cpf} onChange={handleChange} style={styles.input} required />
            <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} style={styles.input} required />
          </fieldset>

          {/* Endereço */}
          <fieldset style={styles.fieldset}>
            <legend>Endereço</legend>
            <input type="text" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} style={styles.input} required />
            <input type="number" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} style={styles.input} required />
            <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} style={styles.input} required />
            <input type="text" name="estado" placeholder="Estado (SP, RJ...)" value={form.estado} onChange={handleChange} style={styles.input} required />
            <input type="text" name="cep" placeholder="CEP (xxxxx-xxx)" value={form.cep} onChange={handleChange} style={styles.input} required />
          </fieldset>

          {/* Contrato */}
          <fieldset style={styles.fieldset}>
            <legend>Contrato</legend>
            <input type="date" name="dtContratacao" value={form.dtContratacao} onChange={handleChange} style={styles.input} required />
            <input type="number" name="salario" placeholder="Salário" value={form.salario} onChange={handleChange} style={styles.input} required />
          </fieldset>

          {/* Botões */}
          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/funcionarios")} style={styles.voltarButton}>◀ Voltar</button>
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

export default CadastrarFuncionario;
