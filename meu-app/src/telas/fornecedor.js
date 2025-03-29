import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

import viewIcon from './view.icon.png';
import editIcon from './editar.icon.png';
import deleteIcon from './lixeira.icon.png';
import boxIcon from './box.icon.png';

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Para armazenar o termo de busca
  const navigate = useNavigate();

  // Função para buscar fornecedores da API
  useEffect(() => {
    fetch("http://localhost:5000/fornecedores")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFornecedores(data);
      })
      .catch((error) => console.error("Erro ao buscar fornecedores:", error));
  }, []);

  // Função para excluir fornecedore
  const excluirFornecedor = (cpf) => {
    fetch(`http://localhost:5000/fornecedores/${cpf}`, { method: "DELETE" })
      .then(() => {
        setFornecedores(fornecedores.filter((fornecedor) => fornecedor.cpf !== cpf));
      })
      .catch((error) => console.error("Erro ao excluir fornecedor:", error));
  };

  // Função para filtrar os fornecedores com base no termo de busca
  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    (fornecedor.nome || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    (fornecedor.cnpj ? fornecedor.cnpj.toString() : "").includes(searchTerm)
  );

  // Função para definir a cor do Status
  const getStatusStyle = (status) => {
    if (status.toLowerCase() === "ativo") {
      return { backgroundColor: "green", color: "white", padding: "1px 10px", borderRadius: "5px" };
    } else if (status.toLowerCase() === "inativo") {
      return { backgroundColor: "red", color: "white", padding: "1px 10px", borderRadius: "5px" };
    }
    return {};
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1 style={{ display: "inline-block" }}>FORNECEDORES</h1>
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
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredFornecedores.length > 0 ? (
              filteredFornecedores.map((fornecedor) => (
                <tr key={fornecedor.cnpj}>
                  <td>{fornecedor.NomeFor}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>
                    <span style={getStatusStyle(fornecedor.Status)}>
                      {fornecedor.Status}
                    </span>
                  </td>
                  <td>
                      <button style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => console.log("Visualizar", fornecedor.cnpj)}>
                          <img src={viewIcon} alt="Visualizar" style={{ width: '20px', height: '20px' }} />
                      </button>
                      <button style={{ backgroundColor: '#ffd700', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => console.log("Editar", fornecedor.cnpj)}>
                          <img src={editIcon} alt="Editar" style={{ width: '20px', height: '20px' }} />
                      </button>
                      {fornecedor.Status.toLowerCase() === "ativo" && (
                        <button 
                          style={{ backgroundColor: '#008000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} 
                          onClick={() => {
                            navigate("/solicitar-compra");
                            console.log("Solicitar Compra", fornecedor.cnpj);
                          }}
                        >
                          <img src={boxIcon} alt="Solicitar Compra" style={{ width: '20px', height: '20px' }} />
                        </button>
                      )}
                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => excluirFornecedor(fornecedor.cnpj)}>
                          <img src={deleteIcon} alt="Excluir" style={{ width: '20px', height: '20px' }} />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum fornecedor encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botão flutuante para adicionar fornecedor */}
        <button
          onClick={() => navigate("/cadastrar-fornecedor")}
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

export default Fornecedor;
