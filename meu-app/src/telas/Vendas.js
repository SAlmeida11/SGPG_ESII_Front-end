import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

function Venda() {
  useVerificarAutenticacao();
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Tela de Venda</h1>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={{ padding: "10px", fontSize: "16px" }}>Abastecimento</button>
          <button style={{ padding: "10px", fontSize: "16px" }}>Produto</button>
        </div>

        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gasolina Premium (litros)</td>
              <td>100</td>
              <td>R$ 8,00</td>
            </tr>
          </tbody>
        </table>

        <h3>Total: R$ 800,00</h3>

        <div style={{ marginTop: "20px" }}>
          <h2>Informações do Cliente</h2>
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button style={{ padding: "8px", backgroundColor: "green", color: "white" }}>+ Cadastrar Cliente</button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h2>Pagamento</h2>
          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="">Selecione a forma de pagamento</option>
            <option value="cartao">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate("/venda")} style={{ padding: "10px", backgroundColor: "red", color: "white" }}>Cancelar</button>
          <button style={{ padding: "10px", backgroundColor: "green", color: "white" }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default Venda;