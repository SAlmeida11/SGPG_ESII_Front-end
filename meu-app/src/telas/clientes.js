
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

import viewIcon from './view.icon.png';
import editIcon from './editar.icon.png';
import deleteIcon from './lixeira.icon.png';

function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Para armazenar o termo de busca
  const navigate = useNavigate();

  // Função para buscar clientes da API
  useEffect(() => {
    fetch("http://localhost:5000/clientes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClientes(data);
      })
      .catch((error) => console.error("Erro ao buscar clientes:", error));
  }, []);

  // Função para excluir cliente
  const excluirCliente = (cpf) => {
    fetch(`http://localhost:5000/clientes/${cpf}`, { method: "DELETE" })
      .then(() => {
        setClientes(clientes.filter((cliente) => cliente.cpf !== cpf));
      })
      .catch((error) => console.error("Erro ao excluir cliente:", error));
  };

  // Função para filtrar os clientes com base no termo de busca
  const filteredClientes = clientes.filter((cliente) =>
    (cliente.nome || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    (cliente.cpf || "").includes(searchTerm)
  );
  

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1 style={{ display: "inline-block" }}>CLIENTES</h1>
        {/* Campo de busca */}
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

        <table
          border="1"
          style={{ width: "100%", marginTop: "10px", textAlign: "center" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Cadastro</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={cliente.cpf}>
                  <td>{cliente.nomeCliente}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.dataCadastro}</td>
                  <td>
                      <button style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => console.log("Visualizar", cliente.cpf)}>
                          <img src={viewIcon} alt="Visualizar" style={{ width: '20px', height: '20px' }} />
                      </button>
                      <button style={{ backgroundColor: '#ffd700', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => console.log("Editar", cliente.cpf)}>
                          <img src={editIcon} alt="Editar" style={{ width: '20px', height: '20px' }} />
                      </button>
                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => excluirCliente(cliente.cpf)}>
                          <img src={deleteIcon} alt="Excluir" style={{ width: '20px', height: '20px' }} />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum cliente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botão flutuante para adicionar cliente */}
        <button
          onClick={() => navigate("/cadastrar-cliente")}
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

export default Cliente;
