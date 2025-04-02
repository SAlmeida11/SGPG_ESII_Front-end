import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./telas/Login/login.js";
import Funcionario from "./telas/Funcionario/funcionario.js";
import CadastrarFuncionario from "./telas/Funcionario/CadastrarFuncionario.js"; // Importa a tela de cadastro
import Reservatorio from "./telas/Reservatorio/reservatorio.js";
import Servicos from "./telas/Servico/servicos.js";
import CadastrarServico from "./telas/Servico/CadastrarServico.js";
import CadastrarReservatorio from "./telas/Reservatorio/CadastrarReservatorio.js";
import Venda from './telas/Venda/Vendas.js';
import Cliente from './telas/Cliente/clientes';
import CadastrarCliente from "./telas/Cliente/CadastrarCliente.js";
import Fornecedor from "./telas/Fornecedor/fornecedor.js";
import Itens from "./telas/Item/item.js";
import CadastrarItem from "./telas/Item/CadastarItem.js";
import CadastrarFornecedor from "./telas/Fornecedor/CadastrarFornecedor.js";
import Combustivel from "./telas/Combustivel/combustivel.js"
import CadastrarCombustivel from "./telas/Combustivel/CadastrarCombustivel.js"
import VisualizarFornecedor from "./telas/Fornecedor/VisualizarFornecedor.js";
import VisualizarCliente from "./telas/Cliente/VisualizarCliente.js";
import VisualizarFuncionario from "./telas/Funcionario/VisualizarFuncionario.js";
import VisualizarItem from "./telas/Item/VisualizarItem.js";
import EditarCliente from "./telas/Cliente/EditarCliente.js";
import EditarFornecedor from "./telas/Fornecedor/EditarFornecedor.js";
import EditarCombustivel from "./telas/Combustivel/EditarCombustivel.js";
import EditarFuncionario from "./telas/Funcionario/EditarFuncionario.js";
import EditarItem from "./telas/Item/EditarItem.js";
import EditarReservatorio from "./telas/Reservatorio/EditarReservatorio.js";
import EditarServico from "./telas/Servico/EditarServico.js";

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
          <Route path="/editar-funcionario" element={<EditarFuncionario />} />
          <Route path="/editar-combustivel" element={<EditarCombustivel />} />
          <Route path="/editar-servico" element={<EditarServico />} />
          <Route path="/editar-reservatorio" element={<EditarReservatorio />} />
          <Route path="/editar-item/:CodigoBarras" element={<EditarItem />} />
          <Route path="/fornecedores" element={<Fornecedor />} />
          <Route path="/funcionarios" element={<Funcionario />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/itens" element={<Itens />} />
          <Route path="/reservatorios" element={<Reservatorio />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/venda" element={<Venda />} />
          <Route path="/visualizar-fornecedor" element={<VisualizarFornecedor />} />
          <Route path="/visualizar-cliente" element={<VisualizarCliente />} />
          <Route path="/visualizar-funcionario/:cpf" element={<VisualizarFuncionario />} />
          <Route path="/visualizar-item/:codigoBarras" element={<VisualizarItem />} />
          <Route path="/editar-funcionario/:cpf" element={<EditarFuncionario />} />
          {/* Removendo comentários e garantindo que as rotas futuras sejam implementadas corretamente */}
          {/* <Route path="/venda" element={<Venda />} /> */}
          {/* <Route path="/sair" element={<Sair />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

