import React, { useState, useEffect, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao.js";
import { FaTrash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

function Itens() {
  useVerificarAutenticacao();
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Item A",
      preco: 10.5,
      quantidade: 5,
    },
  ]);
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
      .catch((error) => {
        console.error("Erro ao excluir item:", error)
        alert("Erro ao excluir item!")
      });
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
                    <div style={{
                      display: "flex",
                      gap: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px"

                    }}>
                      <Link to="/visualizar-item" >
                        <button style={{ backgroundColor: '#A7A7A7', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("idItem", item.id); }}>
                          <IoEyeSharp
                            alt="Visualizar" style={styles.icon} />
                        </button>
                      </Link>
                      <Link to="/editar-item" >
                        <button style={{ backgroundColor: '#DFB408', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                          onClick={() => { localStorage.setItem("idItem", item.id); }}>
                          <MdEdit
                            alt="Editar" style={styles.icon} />
                        </button>
                      </Link>
                      <button style={{ backgroundColor: '#ff0000', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => excluirItem(item.id)}>
                        <FaTrash alt="Excluir" style={styles.icon} />
                      </button>

                    </div>

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

const styles = {
  icon: { width: '18px', height: '18px', color: 'white' },
}

export default Itens;

