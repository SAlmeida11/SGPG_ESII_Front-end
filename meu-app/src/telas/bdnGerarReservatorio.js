import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function Reservatorios() {
  useVerificarAutenticacao();
  const [reservatorios, setReservatorios] = useState("");
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
                  <Link to="/editar-reservatorio">
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }} onClick={() => console.log("Editar", reservatorio.id)}>
                          <MdEdit alt="Editar" style={styles.icon} />
                        </button>
                      </Link>

                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }} onClick={() => excluirReservatorio(reservatorio.id)}>
                        <FaTrash alt="Excluir" style={styles.icon} />
                      </button>
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

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Reservatorios;
