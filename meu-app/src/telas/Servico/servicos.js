import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

function Servicos() {
  useVerificarAutenticacao();
  const [servicos, setServicos] = useState([
    {
      id: 1,
      descricao: "Alinhamento",
      valor: 50.0,
      tempoEstimado: 30,
      ativo: "Ativo",
    },

  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/servicos")
      .then((response) => response.json())
      .then((data) => {
        setServicos(data);
      })
      .catch((error) => console.error("Erro ao buscar serviços:", error));
  }, []);

  //Função para excluir serviço
  const excluirServico = (id) => {
    fetch(`http://localhost:5000/delete-servico/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir serviço.");
        }
        return response.json();
      })
      .then(() => {
        setServicos(servicos.filter((s) => s.id !== id));
        alert("Serviço excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir serviço:", error));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>SERVIÇOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Descrição</th>
              <th>Valor (R$)</th>
              <th>Duração Estimado</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length > 0 ? (
              servicos.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.descricao}</td>
                  <td>R${servico.valor.toFixed(2)}</td>
                  <td>{servico.duracaoEstimada} minutos</td>
                  <td>
                    <div style={{
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px"

                    }}>
                      <Link to="/visualizar-servico">
                        <button style={{ backgroundColor: '#A7A7A7', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                            // onClick={() => { localStorage.setServicos("Id", servico.cpf); }}
                            >
                            <IoEyeSharp alt="Visualizar" style={styles.icon} />
                        </button>
                      </Link>
                      <Link to="/editar-servico" >
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("idServico", servico.id); }}>
                          <MdEdit
                            alt="Editar" style={styles.icon} />
                        </button>
                      </Link>
                      <button
                        style={{ backgroundColor: '#ff0000', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => excluirServico(servico.id)}
                        >
                        <FaTrash alt="Excluir" style={styles.icon} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum serviço encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={() => navigate("/cadastrar-servico")}
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

export default Servicos;