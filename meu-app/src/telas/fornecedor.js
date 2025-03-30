import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import viewIcon from './view.icon.png';
import editIcon from './editar.icon.png';
import deleteIcon from './lixeira.icon.png';
import boxIcon from './box.icon.png';
import { FaPowerOff } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { BsBoxSeam, BsBoxSeamFill, BsFillBoxSeamFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

function Fornecedor() {

  const [fornecedores, setFornecedores] = useState([
    {
      NomeFor: "Fornecedor 1",
      cnpj: "00.000.000/0001-00",
      telefone: "(11) 99999-9999",
      Status: "Ativo",
    }
  ]);
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
                    <div style={{
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px"

                    }}>
                      <Link to="/visualizar-fornecedor" >
                        <button style={{ backgroundColor: '#A7A7A7', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => console.log("Visualizar", fornecedor.cnpj)}>
                          <IoEyeSharp
                            alt="Visualizar" style={styles.icon} />
                        </button>
                      </Link>
                      <Link to="/editar-fornecedor" >
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => console.log("Editar", fornecedor.cnpj)}>
                          <MdEdit
                            alt="Editar" style={styles.icon} />
                        </button>
                      </Link>
                      {fornecedor.Status.toLowerCase() === "ativo" && (
                        <button
                          style={{ backgroundColor: '#008000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => {
                            navigate("/solicitar-compra");
                          }}
                        >
                          <BsFillBoxSeamFill
                            alt="Solicitar Compra" style={styles.icon} />
                        </button>
                      )}
                      {(fornecedor.Status.toLowerCase() === "ativo") ? (
                        <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => excluirFornecedor(fornecedor.cnpj)}>
                          {/* <img src={deleteIcon} alt="Excluir" style={{ width: '18px', height: '18px' }} /> */}
                          <FaPowerOff style={styles.icon} />
                        </button>
                      ) : (
                        <button style={{ backgroundColor: 'green', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => excluirFornecedor(fornecedor.cnpj)}>
                          {/* <img src={deleteIcon} alt="Excluir" style={{ width: '18px', height: '18px' }} /> */}
                          <FaPowerOff style={styles.icon} />
                        </button>
                      )}

                    </div>
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

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Fornecedor;

