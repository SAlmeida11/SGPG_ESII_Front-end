
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { formatarCPF } from "../../func/cpf.js";
import { formatarData } from "../../func/data.js";

/* {
  "cpf": "12345678901",
  "dataCadastro": "Tue, 10 Jan 2023 00:00:00 GMT",
  "endereco_id_endereco": 1,
  "nomeCliente": "Jo\u00e3o Silva",
  "tipo": "Pessoa F\u00edsica"
}, */

function Cliente() {
  useVerificarAutenticacao();
  const [clientes, setClientes] = useState([
    { nomeCliente: "", cpf: "", dataCadastro: "" }
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // Para armazenar o termo de busca
  const navigate = useNavigate();

  // Função para buscar clientes da API
  useEffect(() => {
    fetch("http://localhost:5000/clientes")
      .then((response) => response.json())
      .then((data) => {

        setClientes(data);
      })
      .catch((error) => console.error("Erro ao buscar clientes:", error));
  }, []);

  //Função para excluir cliente
  const excluirCliente = (cpf) => {
    fetch(`http://localhost:5000/delete-cliente/${cpf}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir cliente.");
        }
        return response.json();
      })
      .then(() => {
        setClientes(clientes.filter((c) => c.cpf !== cpf));
        alert("cliente excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir cliente:", error));
  };

  // Função para filtrar os clientes com base no termo de busca
  const filteredClientes = clientes.filter((cliente) =>
    (cliente.nomeCliente || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
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
                  <td>{formatarCPF(cliente.cpf)}</td>
                  <td>{formatarData(cliente.dataCadastro)}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "4px"
                      }}
                    >
                      <Link to="/visualizar-cliente">
                        <button style={{ backgroundColor: '#A7A7A7', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("cpfCliente", cliente.cpf); }}>
                          <IoEyeSharp alt="Visualizar" style={styles.icon} />
                        </button>
                      </Link>

                      <Link to="/editar-cliente">
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => localStorage.setItem("cpfCliente", cliente.cpf)}>
                          <MdEdit alt="Editar" style={styles.icon} />
                        </button>
                      </Link>
                    <button
                      style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                      onClick={() => excluirCliente(cliente.cpf)}
                    >
                      <FaTrash alt="Excluir" style={styles.icon} />
                    </button>
                    </div>
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
    </div >
  );
}

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Cliente;
