import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";

function EditarFuncionario() {
  useVerificarAutenticacao();

  const { cpf } = useParams(); // Obtém o CPF do funcionário da URL
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nomeFun: "",
    cpf: "",
    dtNascimento: "",
    cep: "",
    cidade: "",
    estado: "",
    logradouro: "",
    numero: "",
    telefone: "",
    email: "",
    admin: 0, // Campo admin adicionado
    vinculo: {
      dtContratacao: "",
      salario: 0.0
    }
  });

  useEffect(() => {
    async function fetchFuncionario() {
      try {
        const response = await fetch(`http://localhost:5000/funcionarios/${cpf}`);
        const data = await response.json();
        setForm({
          nomeFun: data.nomeFun || "",
          cpf: data.cpf || "",
          dtNascimento: formatDate(data.dtNascimento) || "",
          cep: data.endereco.cep || "",
          cidade: data.endereco.cidade || "",
          estado: data.endereco.estado || "",
          logradouro: data.endereco.logradouro || "",
          numero: data.endereco.numero || "",
          telefone: data.telefone || "",
          email: data.email || "",
          admin: data.admin || 0, // Preencher o campo admin com o valor da API
          vinculo: {
            dtContratacao: formatDate(data.vinculo.dtContratacao) || "",
            salario: data.vinculo.salario || 0.0
          }
        });
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
      }
    }

    fetchFuncionario();
  }, [cpf]);

  // Função para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Retorna no formato yyyy-mm-dd
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("vinculo.")) {
      // Se o nome começa com "vinculo.", atualiza apenas esse campo dentro do objeto vinculo
      const key = name.split(".")[1]; // Extrai a chave real (dtContratacao ou salario)
      setForm((prevForm) => ({
        ...prevForm,
        vinculo: {
          ...prevForm.vinculo,
          [key]: value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/editar-funcionario/${cpf}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin: form.admin, // Adicionando o campo admin no body
          nomeFun: form.nomeFun,
          cpf: form.cpf,
          dtNascimento: form.dtNascimento,
          endereco: {
            cep: form.cep,
            cidade: form.cidade,
            estado: form.estado,
            logradouro: form.logradouro,
            numero: form.numero
          },
          telefone: form.telefone,
          email: form.email,
          vinculo: form.vinculo
        }),
      });

      if (response.ok) {
        alert("Funcionário atualizado com sucesso!");
        navigate("/funcionarios"); // Volta para a tela de funcionários
      } else {
        alert("Erro ao atualizar funcionário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Editar Funcionário</h1>
        <form onSubmit={handleSubmit}>
          {/* Seção: Informações Pessoais */}
          <fieldset style={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input
              type="text"
              name="nomeFun"
              placeholder="Nome"
              value={form.nomeFun}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
              style={styles.input}
              disabled
            />
            <input
              type="date"
              name="dtNascimento"
              placeholder="Data de Nascimento"
              value={form.dtNascimento}
              onChange={handleChange}
              style={styles.input}
            />
          </fieldset>

          {/* Seção: Endereço */}
          <fieldset style={styles.fieldset}>
            <legend>Endereço</legend>
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={form.cep}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={form.estado}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="logradouro"
              placeholder="Logradouro"
              value={form.logradouro}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={form.numero}
              onChange={handleChange}
              style={styles.input}
            />
          </fieldset>

          {/* Seção: Vínculo */}
          <fieldset style={styles.fieldset}>
            <legend>Vínculo</legend>
            <input
              type="date"
              name="vinculo.dtContratacao"
              placeholder="Data de Contratação"
              value={form.vinculo.dtContratacao}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="number"
              name="vinculo.salario"
              placeholder="Salário"
              value={form.vinculo.salario}
              onChange={handleChange}
              style={styles.input}
            />
          </fieldset>

          {/* Seção: Admin */}
          <fieldset style={styles.fieldset}>
            <legend>Admin</legend>
            <select
              name="admin"
              value={form.admin}
              onChange={handleChange}
              style={styles.input}
            >
              <option value={1}>Sim</option>
              <option value={0}>Não</option>
            </select>
          </fieldset>

          {/* Botões */}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => navigate("/funcionarios")}
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
  salvarButton: {
    backgroundColor: "#008000",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EditarFuncionario;