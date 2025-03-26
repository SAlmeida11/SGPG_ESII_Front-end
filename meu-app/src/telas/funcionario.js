import React, { useState, useEffect } from "react";
import Sidebar from "./menu.js";

function Funcionario() {
  const [funcionario, setFuncionarios] = useState([]);

  // Função para buscar funcionários da API
  useEffect(() => {
    fetch("http://localhost:5000/funcionarios")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log para verificar os dados retornados
        setFuncionarios(data);
      })
      .catch((error) => console.error("Erro ao buscar funcionários:", error));
  }, []);

  // Função para excluir funcionário
  const excluirFuncionario = (cpf) => {
    fetch(`http://localhost:5000/funcionarios/${cpf}`, { method: "DELETE" })
      .then(() => {
        setFuncionarios(funcionario.filter((f) => f.cpf !== cpf));
      })
      .catch((error) => console.error("Erro ao excluir funcionário:", error));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>FUNCIONÁRIOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Admitido</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {funcionario.length > 0 ? (
              funcionario.map((funcionario) => (
                <tr key={funcionario.cpf}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cpf}</td>
                  {/* Alterado: "telefone" corresponde à data de nascimento no JSON */}
                  <td>{funcionario.telefone}</td>
                  {/* Alterado: "status" interpretado como 0 ou 1 */}
                  <td>{funcionario.status === 1 ? "Sim" : "Não"}</td>
                  <td>
                    <button onClick={() => console.log("Editar", funcionario.cpf)}>Editar</button>
                    <button onClick={() => console.log("Visualizar", funcionario.cpf)}>Visualizar</button>
                    <button onClick={() => excluirFuncionario(funcionario.cpf)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum funcionário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Funcionario;


/*
import React from "react";
import Sidebar from "./menu.js";

function Funcionario() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>FUNCIONÁRIOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center"}}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João da Silva</td>
              <td>123.456.789-09</td>
              <td>(11) 98765-4321</td>
              <td>Ativo</td>
              <td>
                <button>Editar</button>
                <button>Visualizar</button>
                <button>Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Funcionario;
*/