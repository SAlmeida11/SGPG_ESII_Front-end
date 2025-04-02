import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

//
function CadastrarItem() {
  useVerificarAutenticacao();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco_unitario: "",
    quantidade_disponivel: "",
    codigo_barras: "",
    funcionario_cpf: "",
    ativo: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Item cadastrado com sucesso!");
        navigate("/item");
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

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Nome do Item:</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do Item"
                  value={form.nome}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Categoria:</label>
                <input
                  type="text"
                  name="categoria"
                  placeholder="Categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Preço (R$):</label>
                <input
                  type="number"
                  name="preco_unitario"
                  placeholder="Preço (R$)"
                  value={form.preco_unitario}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Quantidade Disponível:</label>
                <input
                  type="number"
                  name="quantidade_disponivel"
                  placeholder="Quantidade Disponível"
                  value={form.quantidade_disponivel}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Código de Barras:</label>
                <input
                  type="text"
                  name="codigo_barras"
                  placeholder="Código de Barras"
                  value={form.codigo_barras}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.label}>CPF do Funcionário:</label>
                <input
                  type="text"
                  name="funcionario_cpf"
                  placeholder="CPF do Funcionário"
                  value={form.funcionario_cpf}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </fieldset>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={() => navigate(-1)} // Volta para a tela anterior
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
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  inputWrapper: {
    width: "48%", // Para garantir que dois campos fiquem na mesma linha
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
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
