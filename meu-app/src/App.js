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
import Venda from './telas/Vendas';
import Cliente from './telas/clientes';
import CadastrarCliente from "./telas/CadastrarCliente.js";
import Fornecedor from "./telas/fornecedor.js";
import Itens from "./telas/item.js";
import CadastrarItem from "./telas/CadastarItem.js";
import CadastrarFornecedor from "./telas/CadastrarFornecedor.js";
import Combustivel from "./telas/combustivel.js"
import CadastrarCombustivel from "./telas/CadastrarCombustivel.js"
import VisualizarFornecedor from "./telas/VisualizarFornecedor.js";
import VisualizarCliente from "./telas/VisualizarCliente.js";
import VisualizarFuncionario from "./telas/VisualizarFuncionario.js";
import VisualizarItem from "./telas/VisualizarItem.js";
import EditarCliente from "./telas/EditarCliente.js";
import EditarFornecedor from "./telas/EditarFornecedor.js";

function App() {
  return (
    <Router>
      <div style={{ marginLeft: "0px", padding: "0px", flexGrow: "1" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
          <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
          <Route path="/cadastrar-item" element={<CadastrarItem />} />
          <Route path="/fornecedores" element={<Fornecedor />} /> 
          <Route path="/Cadastrar-fornecedor" element={<CadastrarFornecedor />} /> 
          <Route path="/combustiveis" element={<Combustivel />} />
          <Route path="/cadastrar-combustivel" element={<CadastrarCombustivel />} />
          <Route path="/cadastrar-reservatorio" element={<CadastrarReservatorio />} />
          <Route path="/cadastrar-servico" element={<CadastrarServico />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/editar-cliente" element={<EditarCliente />} />
          <Route path="/editar-fornecedor" element={<EditarFornecedor />} />
          <Route path="/fornecedores" element={<Fornecedor />} />
          <Route path="/funcionarios" element={<Funcionario />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/item" element={<Itens />} />
          <Route path="/reservatorios" element={<Reservatorio />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/venda" element={<Venda />} />
          <Route path="/visualizar-fornecedor" element={<VisualizarFornecedor />} />
          <Route path="/visualizar-cliente" element={<VisualizarCliente />} />
          <Route path="/visualizar-funcionario/:cpf" element={<VisualizarFuncionario />} />
          <Route path="/visualizar-item" element={<VisualizarItem />} />
          {/* Removendo comentários e garantindo que as rotas futuras sejam implementadas corretamente */}
          {/* <Route path="/venda" element={<Venda />} /> */}
          {/* <Route path="/sair" element={<Sair />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

