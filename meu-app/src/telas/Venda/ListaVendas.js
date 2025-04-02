import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";

function ListarVendas() {
  const [vendas, setVendas] = useState([]);
  const [itensVisiveis, setItensVisiveis] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/listarvendas")
      .then((response) => response.json())
      .then((data) => setVendas(data))
      .catch((error) => console.error("Erro ao buscar vendas:", error));
  }, []);

  const toggleItens = (id) => {
    setItensVisiveis((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>LISTA DE VENDAS</h1>
        <table border="1" style={{ width: "100%", marginTop: "10px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Itens</th>
              <th>Valor</th>
              <th>Forma de Pagamento</th>
              <th>CPF Cliente</th>
              <th>CPF Funcionário</th>
            </tr>
          </thead>
          <tbody>
            {vendas.length > 0 ? (
              vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>
                    <div onClick={() => toggleItens(venda.id)} style={{ cursor: "pointer"}}>
                      {venda.itens.split(",")[0]}
                    </div>
                    {itensVisiveis[venda.id] && (
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {venda.itens.split(",").map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>{venda.valor}</td>
                  <td>{venda.tipoPagamento}</td>
                  <td>{venda.cpfCliente}</td>
                  <td>{venda.cpfFuncionario}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhuma venda encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={styles.buttonContainer}>
          <button type="button" onClick={() => navigate("/venda")} style={styles.voltarButton}>
            ◀ Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
  },
  voltarButton: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ListarVendas;
