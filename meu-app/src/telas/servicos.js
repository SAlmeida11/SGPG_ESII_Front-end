import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function Servicos() {
  useVerificarAutenticacao();
  const [servicos, setServicos] = useState([
    {
      id: 1,
      descricao: "Corte de Cabelo",
      valor: 50.0,
      tempoEstimado: 30,
      ativo: true,
    },
    {
      id: 2,
      descricao: "Manicure",
      valor: 40.0,
      tempoEstimado: 45,
      ativo: true,
    },
    {
      id: 3,
      descricao: "Massagem Relaxante",
      valor: 120.0,
      tempoEstimado: 60,
      ativo: false,
    },
    {
      id: 4,
      descricao: "Limpeza de Pele",
      valor: 80.0,
      tempoEstimado: 50,
      ativo: true,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/servicos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServicos(data);
      })
      .catch((error) => console.error("Erro ao buscar serviços:", error));
  }, []);

  const excluirServico = (id) => {
    fetch('http://localhost:5000/servicos/${id}', { method: "DELETE" })
      .then(() => {
        setServicos(servicos.filter((s) => s.id !== id));
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
              <th>Tempo Estimado</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length > 0 ? (
              servicos.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.descricao}</td>
                  <td>R${servico.valor.toFixed(2)}</td>
                  <td>{servico.tempoEstimado} minutos</td>
                  <td>
                    <span style={{ color: servico.ativo ? "green" : "red" }}>
                      {servico.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => console.log("Editar", servico.id)}>Editar</button>
                    <button onClick={() => console.log("Visualizar", servico.id)}>Visualizar</button>
                    <button onClick={() => excluirServico(servico.id)}>Excluir</button>
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

export default Servicos;