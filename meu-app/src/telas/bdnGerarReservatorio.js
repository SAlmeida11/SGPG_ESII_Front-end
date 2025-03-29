import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function Reservatorios() {
  useVerificarAutenticacao();
  const [reservatorios, setReservatorios] = useState([]);
  const navigate = useNavigate();

  // Buscar reservatórios da API
  useEffect(() => {
    fetch("http://localhost:5000/reservatorios")
      .then((response) => response.json())
      .then((data) => setReservatorios(data))
      .catch((error) => console.error("Erro ao buscar reservatórios:", error));
  }, []);

  // Função para excluir um reservatório
  const excluirReservatorio = (id) => {
    fetch(`http://localhost:5000/reservatorios/${id}`, { method: "DELETE" })
      .then(() => {
        setReservatorios(reservatorios.filter((r) => r.id !== id));
      })
      .catch((error) => console.error("Erro ao excluir reservatório:", error));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>RESERVATÓRIOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Tipo Combustível</th>
              <th>Capacidade (L)</th>
              <th>Nível Atual (L)</th>
              <th>Temperatura</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {reservatorios.length > 0 ? (
              reservatorios.map((reservatorio) => (
                <tr key={reservatorio.id}>
                  <td>{reservatorio.tipoCombustivel}</td>
                  <td>{reservatorio.capacidade}</td>
                  <td>{reservatorio.nivelAtual}</td>
                  <td>{reservatorio.temperatura}°C</td>
                  <td>
                    <button onClick={() => console.log("Editar", reservatorio.id)}>✏️</button>
                    <button onClick={() => excluirReservatorio(reservatorio.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum reservatório encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botão flutuante para adicionar reservatório */}
        <button
          onClick={() => navigate("/cadastrar-reservatorio")}
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

export default Reservatorios;