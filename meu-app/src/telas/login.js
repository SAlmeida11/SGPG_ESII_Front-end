import React from "react";
import '../App.css'; 


function Login() {
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
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" style={{ width: '90%', padding: '8px', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" name="senha" style={{ width: '90%', padding: '8px', marginTop: '5px' }} />
              <div style={{ textAlign: 'right', marginTop: '5px' }}>
                <a href="#" style={{ fontSize: '12px' }}>Esqueci minha senha</a>
              </div>
            </div>
            <button type="submit" style={{ backgroundColor: '#800000', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;