import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";

function Itens() {
  const [itens, setItens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/itens")
      .then((response) => response.json())
      .then((data) => setItens(data))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  const excluirItem = (id) => {
    fetch(`http://localhost:5000/itens/${id}`, { method: "DELETE" })
      .then(() => setItens(itens.filter((item) => item.id !== id)))
      .catch((error) => console.error("Erro ao excluir item:", error));
  };

  const filteredItens = itens.filter((item) =>
    (item.nome || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1 style={{ display: "inline-block" }}>ITENS</h1>
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
          <button onClick={() => console.log("Buscar:", searchTerm)}>🔍</button>
        </div>
        <table border="1" style={{ width: "100%", marginTop: "10px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredItens.length > 0 ? (
              filteredItens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    <button onClick={() => console.log("Editar", item.id)}>✏️</button>
                    <button onClick={() => console.log("Visualizar", item.id)}>👁️</button>
                    <button onClick={() => excluirItem(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum item encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={() => navigate("/cadastrar-item")}
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

export default Itens;
