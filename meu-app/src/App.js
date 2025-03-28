import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./telas/login.js";
import Funcionario from "./telas/funcionario.js";
import CadastrarFuncionario from "./telas/CadastrarFuncionario.js"; // Importa a tela de cadastro
import Reservatorio from "./telas/bdnGerarReservatorio.js";
import Servicos from "./telas/servicos.js";
import CadastrarServico from "./telas/CadastrarServico.js";
import CadastrarReservatorio from "./telas/CadastrarReservatorio.js";
import Venda from "./telas/Venda.js";
import Cliente from "./telas/cliente.js";
import CadastrarCliente from "./telas/CadastrarCliente.js";

function App() {
  return (
    <Router>
      <div style={{ marginLeft: "0px", padding: "0px", flexGrow: "1" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/funcionarios" element={<Funcionario />} />
          <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
          <Route path="/reservatorios" element={<Reservatorio />} />
          <Route path="/servicos" element={<Servicos />} /> 
          <Route path="/cadastrar-servico" element={<CadastrarServico />} />
          <Route path="/cadastrar-reservatorio" element={<CadastrarReservatorio />} />
          <Route path="/Venda" element={<Venda />} /> 
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          {/* Removendo comentários e garantindo que as rotas futuras sejam implementadas corretamente */}
          {/* <Route path="/venda" element={<Venda />} /> */}
          {/* <Route path="/fornecedores" element={<Fornecedor />} /> */}
          {/* <Route path="/sair" element={<Sair />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BdnGerenciarReservatorio from "./pages/BdnGerenciarReservatorio"
*/