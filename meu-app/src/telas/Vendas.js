import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./menu.js";
import useVerificarAutenticacao from "./autenticacao";

import bomba from './bomba.png';
import cesta from './cesta.png';

function Venda() {
  useVerificarAutenticacao();
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1", display: "flex" }}>
        {/* Lado esquerdo: Itens e Total */}
        <div style={{ width: "50%", paddingRight: "20px", marginRight: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Título "Venda" fora da borda */}
          <h1>Venda</h1>

          <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", flexGrow: 1, backgroundColor: '#d3d3d3' }}>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
              <thead>
                <tr style={{ backgroundColor: "#800000", color: "white" }}>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "white" }}>Gasolina Premium (litros)</td>
                  <td style={{ backgroundColor: "white" }}>100</td>
                  <td style={{ backgroundColor: "white" }}>R$ 8,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total fora da borda */}
          <h3 style={{ marginTop: "20px" }}>Total: R$ 800,00</h3>
        </div>

        {/* Lado direito: Botões e Informações */}
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          {/* Alinhar os botões com o início da tabela, próximos à tabela */}
          <div style={{ marginTop: "85px", display: "flex", justifyContent: "flex-start", gap: "20px" }}>
            <button style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
              <img src={bomba} alt="Abastecimento" style={{ width: '100px', height: '100px' }} />
            </button>
            <button style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
              <img src={cesta} alt="Produto" style={{ width: '100px', height: '100px' }} />
            </button>
          </div>

          {/* Informações do Cliente com borda e fundo transparente */}
          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
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

          {/* Pagamento com borda e fundo transparente */}
          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
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
    </div>
  );
}

export default Venda;
