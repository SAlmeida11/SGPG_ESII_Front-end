import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importação do hook useNavigate
import '../App.css'; 

function Login() {
  const [cpf, setCpf] = useState("");  // Para armazenar o CPF digitado
  const [senha, setSenha] = useState("");  // Para armazenar a senha digitada
  const [error, setError] = useState("");  // Para armazenar a mensagem de erro
  const navigate = useNavigate();  // Hook para navegação

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      // Salva o CPF no localStorage
      localStorage.setItem("cpf", cpf);
      // Redireciona para a página de vendas
      navigate("/venda");
    } else {
      alert("Login ou Senha incorretos!");  // Exibe a mensagem de erro caso falhe
    }
  };

  return (
    <div style={{ backgroundColor: '#7B0000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: '24px' }}>&larr;</span>
          </button>
        </div>
        <h1 style={{ color: '#800000', fontSize: '40px' }}>SGPG</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              style={{ width: '90%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{ width: '90%', padding: '8px', marginTop: '5px' }}
            />
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
              <a href="#" style={{ fontSize: '12px' }}>Esqueci minha senha</a>
            </div>
          </div>
          <button type="submit" style={{ backgroundColor: '#800000', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro */}
      </div>
    </div>
  );
}

export default Login;
