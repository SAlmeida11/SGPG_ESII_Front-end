import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importando Link corretamente
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";

import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function Itens() {
  useVerificarAutenticacao();
  const [itens, setItens] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/item")
      .then((response) => response.json())
      .then((data) => setItens(data.itens))
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  const excluirItem = (codigo_barras) => {
    fetch(`http://localhost:5000/delete-item/${codigo_barras}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir item.");
        }
        return response.json();
      })
      .then(() => {
        setItens(itens.filter((i) => i.codigo_barras !== codigo_barras));
        alert("Item excluído com sucesso!");
      })
      .catch((error) => console.error("Erro ao excluir item:", error));
  };

  // Filtrando os itens pelo código de barras
  const filteredItens = itens.filter((item) =>
    item.codigo_barras.toLowerCase().includes(searchTerm.toLowerCase()) // Comparando o código de barras com o termo de busca
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
            onChange={(e) => setSearchTerm(e.target.value)} // Atualizando o termo de busca
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
                    <Link to={`/visualizar-item/${item.codigo_barras}`}>
                      <button
                        style={{
                          backgroundColor: "#A7A7A7",
                          border: "none",
                          padding: "8px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: '5px'
                        }}
                      >
                        <IoEyeSharp alt="Visualizar" style={styles.icon} />
                      </button>
                    </Link>
                    <Link to={`/editar-item/${item.codigo_barras}`}>
                      <button
                        style={{
                          backgroundColor: "#DFB408",
                          border: "none",
                          padding: "8px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: '5px'
                        }}
                      >
                        <MdEdit alt="Editar" style={styles.icon} />
                      </button>
                    </Link>
                    <button
                      style={{
                        backgroundColor: "red",
                        border: "none",
                        padding: "8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => excluirItem(item.codigo_barras)}
                    >
                      <FaTrash style={styles.icon} />
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
};

export default Itens;
