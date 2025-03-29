/*import React from "react";
import '../App.css';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.profileSection}>
        <h3>LUÍZ INÁCIO MEDEIROS VELA</h3>
        <button style={styles.logoutButton}>SAIR</button>
      </div>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>VENDA</li>
        <li style={styles.menuItem}>FORNECEDORES</li>
        <li style={styles.menuItem}>ITEM</li>
        <li style={styles.menuItem}>SERVIÇOS</li>
        <li style={styles.menuItem}>RESERVATÓRIOS</li>
        <li style={styles.menuItem}>FUNCIONÁRIOS</li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#2d3436",
    color: "#ffffff",
    padding: "10px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileSection: {
    marginBottom: "20px",
  },
  logoutButton: {
    marginTop: "10px",
    backgroundColor: "#d63031",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  menu: {
    listStyleType: "none",
    padding: 0,
  },
  menuItem: {
    padding: "10px 0",
    cursor: "pointer",
  },
};

export default Sidebar;*/

import React from "react";
import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#800000", // Cor vermelho escuro
        color: "white",
        padding: "20px",
        position: "fixed",
        top: "0",
        left: "0",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}
    >
      {/* Cabeçalho */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2>SGPG</h2>
        <div
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        ></div>
        <p style={{ margin: "10px 0", fontWeight: "bold" }}>
          LUÍZ INÁCIO MEDEIROS VELA
        </p>
        <p>40028922</p>
      </div>

      {/* Menu */}
      {/* Menu */}
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/venda" style={{ color: "white", textDecoration: "none" }}>
            VENDA
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/fornecedores" style={{ color: "white", textDecoration: "none" }}>
            FORNECEDORES
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/item" style={{ color: "white", textDecoration: "none" }}>
            ITEM
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/servicos" style={{ color: "white", textDecoration: "none" }}>
            SERVIÇOS
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/reservatorios" style={{ color: "white", textDecoration: "none" }}>
            RESERVATÓRIOS
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "10px" }}>
          <Link to="/funcionarios" style={{ color: "white", textDecoration: "none" }}>
            FUNCIONÁRIOS
          </Link>
        </li>
        <li style={{ marginBottom: "10px", borderBottom: "3px solid white", paddingBottom: "65px" }}>
          <Link to="/clientes" style={{ color: "white", textDecoration: "none" }}>
            CLIENTES
          </Link>
        </li>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            SAIR
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;