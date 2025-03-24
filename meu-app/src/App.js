//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Login from './telas/login.js';
import Sidebar from './telas/menu.js';
import Funcionario from './telas/funcionario.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservatorio from './telas/bdnGerarReservatorio.js';

function App() {
  return (
    <Router>
      <div style={{ marginLeft: "0px", padding: "0px", flexGrow: "1" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          {'<Route path="/venda" element={<Venda />} />'}
          {'<Route path="/clientes" element={<Cliente />} />'}
          {'<Route path="/fornecedores" element={<Fornecedor />} />'}
          {'<Route path="/servicos" element={<Servico />} />'}
          <Route path="/reservatorios" element={<Reservatorio />} />
          <Route path="/funcionarios" element={<Funcionario />} />
          {'<Route path="/sair" element={<Sair />} />'}
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