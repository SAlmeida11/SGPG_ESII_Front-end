import { useState } from 'react';
import React from 'react';
import Sidebar from './menu';

function Reservatorio() {
  const [reservatorios, setReservatorios] = useState([]); // Estado para armazenar os reservatórios
  const [nome, setNome] = useState(""); // Estado para o nome do reservatório

  const adicionarReservatorio = () => {
    setReservatorios([...reservatorios, nome]);
    setNome(""); // Limpar o campo de input
  };

  const excluirReservatorio = (index) => {
    setReservatorios(reservatorios.filter((_, i) => i !== index));
  };

  return (
    <div className="App-container">
      {/* Sidebar à esquerda */}
      <div className="Sidebar">
        <Sidebar />
      </div>

      {/* Área de conteúdo */}
      <div className="Content" style={{ marginLeft: "250px", padding: "20px", flexGrow: "1" }}>
        <h1>Gerenciar Reservatórios</h1>
        
        {/* Formulário para adicionar */}
        <div>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do reservatório"
          />
          <button onClick={adicionarReservatorio}>Adicionar</button>
        </div>

        {/* Lista de reservatórios */}
        <ul>
          {reservatorios.map((reservatorio, index) => (
            <li key={index}>
              {reservatorio}
              <button onClick={() => excluirReservatorio(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reservatorio;
