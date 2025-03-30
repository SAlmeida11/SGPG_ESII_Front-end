import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa a navegação
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import viewIcon from './view.icon.png';
import editIcon from './editar.icon.png';
import deleteIcon from './lixeira.icon.png';

function Funcionario() {
  useVerificarAutenticacao();
  const [funcionarios, setFuncionarios] = useState([
    {
      nomeFun: "Carlos Silva",
      cpf: "123.456.789-00",
      dtNascimento: "1985-06-15",
      admin: 1,
    },
    {
      nomeFun: "Ana Souza",
      cpf: "987.654.321-00",
      dtNascimento: "1992-09-23",
      admin: 0,
    },
    {
      nomeFun: "Mariana Oliveira",
      cpf: "456.789.123-00",
      dtNascimento: "1988-12-05",
      admin: 1,
    },
    {
      nomeFun: "Pedro Santos",
      cpf: "321.654.987-00",
      dtNascimento: "1995-03-10",
      admin: 0,
    }]);
  const navigate = useNavigate(); // Hook para navegação

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
    fetch("http://localhost:5000/funcionarios/${cpf}", { method: "DELETE" })
      .then(() => {
        setFuncionarios(funcionarios.filter((f) => f.cpf !== cpf));
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
              <th>Administrador</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length > 0 ? (
              funcionarios.map((funcionario) => (
                <tr key={funcionario.cpf}>
                  <td>{funcionario.nomeFun}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.dtNascimento}</td>
                  <td>{funcionario.admin === 1 ? "Sim" : "Não"}</td>
                  <td>
                    <button style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => console.log("Visualizar", funcionario.cpf)}>
                      <img src={viewIcon} alt="Visualizar" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button style={{ backgroundColor: '#ffd700', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => console.log("Editar", funcionario.cpf)}>
                      <img src={editIcon} alt="Editar" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => excluirFuncionario(funcionario.cpf)}>
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

        {/* Botão flutuante para adicionar funcionário */}
        <button
          onClick={() => navigate("/cadastrar-funcionario")} // Redireciona para a tela de cadastro
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