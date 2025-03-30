import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importando Link corretamente
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import { FaPowerOff } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

function Itens() {
  useVerificarAutenticacao();
  const [itens, setItens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/item")
      .then((response) => response.json())
      .then((data) => setItens(data.itens))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  const excluirItem = (codigo_barras) => {
    fetch(`http://localhost:5000/item/${codigo_barras}`, { method: "DELETE" })
      .then(() => setItens(itens.filter((item) => item.codigo_barras !== codigo_barras)))
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
              <th>Categoria</th>
              <th>Código de Barras</th>
              <th>Preço Unitário</th>
              <th>Quantidade Disponível</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredItens.length > 0 ? (
              filteredItens.map((item) => (
                <tr key={item.codigo_barras}>
                  <td>{item.nome}</td>
                  <td>{item.categoria}</td>
                  <td>{item.codigo_barras}</td>
                  <td>R$ {item.preco_unitario.toFixed(2)}</td>
                  <td>{item.quantidade_disponivel}</td>
                  <td>
                    <Link to="/visualizar-item">
                      <button
                        style={{
                          backgroundColor: "#A7A7A7",
                          border: "none",
                          padding: "8px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: '5px'
                        }}
                        onClick={() => console.log("Visualizar", item.codigo_barras)}
                      >
                        <IoEyeSharp alt="Visualizar" style={styles.icon} />
                      </button>
                    </Link>
                    <Link to="/editar-item">
                      <button
                        style={{
                          backgroundColor: "#DFB408",
                          border: "none",
                          padding: "8px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: '5px'
                        }}
                        onClick={() => console.log("Editar", item.codigo_barras)}
                      >
                        <MdEdit alt="Editar" style={styles.icon} />
                      </button>
                    </Link>
                    <button
                      style={{
                        backgroundColor: "green",
                        border: "none",
                        padding: "8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => excluirItem(item.codigo_barras)}
                    >
                      <FaPowerOff style={styles.icon} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nenhum item encontrado.</td>
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

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Itens;
