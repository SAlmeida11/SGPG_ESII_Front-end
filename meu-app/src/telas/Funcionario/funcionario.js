import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa a navegação
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { formatarCPF } from "../../func/cpf.js";
import { formatarData } from "../../func/data.js";

function Funcionario() {
  useVerificarAutenticacao();
  const [funcionarios, setFuncionarios] = useState([
    /* {
      "nomeFun": "Carlos Silva",
      "cpf": "123.456.789-00",
      "dtNascimento": "1985-06-15",
      "admin": 1
    } */
  ]);
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar funcionários da API
  useEffect(() => {
    fetch("http://localhost:5000/funcionarios")
      .then((response) => response.json())
      .then((data) => {

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
      .catch((error) => {
        console.error("Erro ao excluir funcionário:", error)
        alert("Erro ao excluir funcionário!")
      });
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
                  <td>{formatarCPF(funcionario.cpf)}</td>
                  <td>{formatarData(funcionario.dtNascimento)}</td>
                  <td>{funcionario.admin === 1 ? "Sim" : "Não"}</td>
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
                      <Link to="/visualizar-funcionario">
                        <button style={{ backgroundColor: '#A7A7A7', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("idFuncionario", funcionario.cpf); }}>
                          <IoEyeSharp alt="Visualizar" style={styles.icon} />
                        </button>
                      </Link>

                      <Link to="/editar-funcionario">
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("idFuncionario", funcionario.cpf); }}>
                          <MdEdit alt="Editar" style={styles.icon} />
                        </button>
                      </Link>

                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => excluirFuncionario(funcionario.cpf)}>
                        <FaTrash alt="Excluir" style={styles.icon} />
                      </button>
                    </div>
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
    </div >
  );
}

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Funcionario;