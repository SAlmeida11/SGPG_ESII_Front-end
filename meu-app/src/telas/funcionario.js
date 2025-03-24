import React from "react";
import Sidebar from "./menu.js";

function Funcionario() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>FUNCIONÁRIOS</h1>
        <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center"}}>
          <thead>
            <tr style={{ backgroundColor: "#800000", color: "white" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>João da Silva</td>
              <td>123.456.789-09</td>
              <td>(11) 98765-4321</td>
              <td>Ativo</td>
              <td>
                <button>Editar</button>
                <button>Visualizar</button>
                <button>Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Funcionario;
