import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function Reservatorios() {
  useVerificarAutenticacao();
  const [reservatorios, setReservatorios] = useState([
    {
      id: 1,
      tipoCombustivel: "Gasolina",
      capacidade: 5000,
      nivelAtual: 3200,
      temperatura: 25,
    },
    {
      id: 2,
      tipoCombustivel: "Diesel",
      capacidade: 8000,
      nivelAtual: 5000,
      temperatura: 22,
    },
    {
      id: 3,
      tipoCombustivel: "Etanol",
      capacidade: 6000,
      nivelAtual: 4500,
      temperatura: 27,
    },
    {
      id: 4,
      tipoCombustivel: "Querosene",
      capacidade: 7000,
      nivelAtual: 6000,
      temperatura: 24,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReservatorios() {
      try {
        const response = await fetch("http://localhost:5000/reservatorios");
        if (!response.ok) throw new Error("Erro ao buscar reservatórios");

        const data = await response.json();
        // A API retorna um objeto com a chave "reservatorios"
        setReservatorios(data.reservatorios);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchReservatorios();
  }, []);

  const excluirReservatorio = (id) => {
    fetch(`http://localhost:5000/reservatorios/${id}`, { method: "DELETE" })
      .then(() => {
        setReservatorios(reservatorios.filter((r) => r.id !== id));
      })
      .catch((error) =>
        console.error("Erro ao excluir reservatório:", error)
      );
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>RESERVATÓRIOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Combustível</th>
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
                  <td>{reservatorio.combustivel}</td>
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
