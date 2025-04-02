import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function Combustivel() {
  useVerificarAutenticacao();
  const [combustiveis, setCombustiveis] = useState([
    { nome: "A", preco_litro: 2, categoria: "X", quantidade_disponivel: "1000" }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCombustiveis() {
      try {
        const response = await fetch("http://localhost:5000/combustiveis");
        if (!response.ok) throw new Error("Erro ao buscar combustíveis");

        const data = await response.json();
        setCombustiveis(data.combustiveis);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchCombustiveis();
  }, []);

  const excluirCombustivel = (id) => {
    fetch(`http://localhost:5000/combustiveis/${id}`, { method: "DELETE" })
      .then(() => {
        setCombustiveis(combustiveis.filter((combustivel) => combustivel.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir combustível:", error);
        alert("Erro ao excluir combustível!");
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>COMBUSTÍVEIS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>Preço por Litro (R$)</th>
              <th>Categoria</th>
              <th>Quantidade Disponível (L)</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {combustiveis.length > 0 ? (
              combustiveis.map((combustivel) => (
                <tr key={combustivel.id}>
                  <td>{combustivel.nome}</td>
                  <td>R$ {combustivel.preco_litro.toFixed(2)}</td>
                  <td>{combustivel.categoria}</td>
                  <td>{combustivel.quantidade_disponivel} L</td>
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
                      <Link to="/editar-combustivel">
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => localStorage.setItem("idCombustivel", combustivel.id)}>
                          <MdEdit alt="Editar" style={styles.icon} />
                        </button>
                      </Link>

                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => excluirCombustivel(combustivel.id)}>
                        <FaTrash alt="Excluir" style={styles.icon} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum combustível encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Botão flutuante para adicionar combustível */}
        <button
          onClick={() => navigate("/cadastrar-combustivel")}
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

export default Combustivel;
