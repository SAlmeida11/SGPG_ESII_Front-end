import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import Funcionario from "./funcionario.js";

function CadastrarFuncionario() {
  const navigate = useNavigate();
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
  });

  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função para enviar os dados do funcionário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
        navigate("/"); // Volta para a tela de funcionários
      } else {
        alert("Erro ao cadastrar funcionário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Funcionário</h1>
        <form onSubmit={handleSubmit}>
          {/* Seção: Informações Pessoais */}
          <fieldset style={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={styles.input} />
            <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} style={styles.input} />
            <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={form.dataNascimento} onChange={handleChange} style={styles.input} />
          </fieldset>

          {/* Seção: Endereço */}
          <fieldset style={styles.fieldset}>
            <legend>Endereço</legend>
            <input type="text" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} style={styles.input} />
            <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} style={styles.input} />
            <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} style={styles.input} />
            <input type="text" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} style={styles.input} />
            <input type="text" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} style={styles.input} />
          </fieldset>

          {/* Seção: Contato */}
          <fieldset style={styles.fieldset}>
            <legend>Contato</legend>
            <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} style={styles.input} />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
          </fieldset>

          {/* Seção: Contrato */}
          <fieldset style={styles.fieldset}>
            <legend>Contrato</legend>
            <input type="date" name="dataContratacao" placeholder="Data de Contratação" value={form.dataContratacao} onChange={handleChange} style={styles.input} />
            <input type="number" name="salario" placeholder="Salário" value={form.salario} onChange={handleChange} style={styles.input} />
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
}

export default CadastrarFuncionario;
