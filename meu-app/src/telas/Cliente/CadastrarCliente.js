import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { formatarCPF, unformatCPF } from "../../func/cpf.js";

function CadastrarCliente() {
  useVerificarAutenticacao();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomeCliente: "",
    cpf: "",
    dataCadastro: "21/04/2000",
    tipo: "",
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    bairro: "",
    numero: "",
    telefone: "",
    email: "",
  });


  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    let fieldValue = e.target.value;

    if (e.target.name === "cpf") {
      fieldValue = formatarCPF(fieldValue);
    }

    setForm({ ...form, [e.target.name]: fieldValue });

    const { name, value } = e.target;
    // Se o campo alterado for o CEP e tiver 8 dígitos, buscar endereço
    if (name === "cep" && value.length === 8) {
      buscarEndereco(value);
    }
  };

  // Função para enviar os dados do cliente para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formCopy = { ...form };
    formCopy.cpf = unformatCPF(formCopy.cpf);
    try {
      const response = await fetch("http://localhost:5000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCopy),
      });

      console.log("res", response.status);
      const responseBody = await response.json();  // Tenta obter o corpo da resposta
      console.log("Resposta do servidor:", responseBody);

      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        navigate("/clientes"); // Volta para a tela de cliente
      } else {
        alert("Erro ao cadastrar cliente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  // Função para buscar endereço pelo ViaCEP
  const buscarEndereco = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setForm((prevForm) => ({
          ...prevForm,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      } else {
        alert("CEP não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      alert("Erro ao buscar o CEP. Tente novamente.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Cadastrar Cliente</h1>
        <form onSubmit={handleSubmit}>
          {/* Seção: Informações Pessoais */}
          <fieldset style={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input type="text" name="nomeCliente" placeholder="Nome" value={form.nomeCliente} onChange={handleChange} style={styles.input} />
            <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} style={styles.input} />
            <input type="date" name="dataCadastro" placeholder="Data de Cadastro" value={form.dataCadastro} onChange={handleChange} style={styles.input} />
            <select name="tipo" value={form.tipo} onChange={handleChange} style={styles.input}>
              <option value="">Selecione o tipo</option>
              <option value="fisica">Pessoa Física</option>
              <option value="juridica">Pessoa Jurídica</option>
            </select>
          </fieldset>

          {/* Seção: Endereço */}
          <fieldset style={styles.fieldset}>
            <legend>Endereço</legend>
            <input type="text" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} style={styles.input} />
            <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} style={styles.input} />
            <input type="text" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} style={styles.input} />
            <input type="text" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} style={styles.input} />
            <input type="text" name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} style={styles.input} />
            <input type="text" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} style={styles.input} />
          </fieldset>

          {/* Seção: Contato */}
          <fieldset style={styles.fieldset}>
            <legend>Contato</legend>
            <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} style={styles.input} />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
          </fieldset>

          {/* Botões */}
          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate("/clientes")} style={styles.voltarButton}>◀ Voltar</button>
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

export default CadastrarCliente;

