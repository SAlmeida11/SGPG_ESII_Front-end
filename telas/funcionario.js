import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import viewIcon from './view.icon.png';
import editIcon from './editar.icon.png';
import deleteIcon from './lixeira.icon.png';

function Funcionario() {
  useVerificarAutenticacao();
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/funcionarios")
      .then((response) => response.json())
      .then((data) => {
        setFuncionarios(data);
      })
      .catch((error) => console.error("Erro ao buscar funcionários:", error));
  }, []);

  const excluirFuncionario = (cpf) => {
    fetch(`http://localhost:5000/delete-funcionario/${cpf}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir funcionário.");
        }
        return response.json();
      })
      .then(() => {
        setFuncionarios(funcionarios.filter((f) => f.cpf !== cpf));
        alert("Funcionário excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir funcionário:", error));
  };

  // Aplicando o filtro pelo CPF
  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    funcionario.cpf.startsWith(searchTerm)
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1 style={{ display: "inline-block" }}>FUNCIONÁRIOS</h1>
        <div style={{ display: "inline-block", float: "right", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "5px 20px",
              fontSize: "14px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "none",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => console.log("Buscar:", searchTerm)}
          >
            🔍
          </button>
        </div>

        <table border="1" style={{ width: "100%", marginTop: "10px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Administrador</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.length > 0 ? (
              funcionariosFiltrados.map((funcionario) => (
                <tr key={funcionario.cpf}>
                  <td>{funcionario.nomeFun}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.dtNascimento}</td>
                  <td>{funcionario.admin === 1 ? "Sim" : "Não"}</td>
                  <td>
                    <button
                      style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                      onClick={() => navigate(`/visualizar-funcionario/${funcionario.cpf}`)}
                    >
                      <img src={viewIcon} alt="Visualizar" style={{ width: '20px', height: '20px' }} />
                    </button>

                    <button
                      style={{ backgroundColor: '#ffd700', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                      onClick={() => navigate(`/editar-funcionario/${funcionario.cpf}`)}
                    >
                      <img src={editIcon} alt="Editar" style={{ width: '20px', height: '20px' }} />
                    </button>

                    <button
                      style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                      onClick={() => excluirFuncionario(funcionario.cpf)}
                    >
                      <img src={deleteIcon} alt="Excluir" style={{ width: '20px', height: '20px' }} />
                    </button>
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

        <button
          onClick={() => navigate("/cadastrar-funcionario")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#800000",
            color: "white",
            fontSize: "30px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Funcionario;
