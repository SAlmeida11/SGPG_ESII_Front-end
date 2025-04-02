import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/menu.js";
import useVerificarAutenticacao from "../autenticacao";

//import bomba from './bomba.png';
import cesta from './cesta.png';

function Venda() {
  useVerificarAutenticacao();
  const [cpf, setCpf] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [itens, setItens] = useState([]); // Itens que vêm da API
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [mostrarProdutos, setMostrarProdutos] = useState(false);
  const navigate = useNavigate();

  // Carrega os itens da API
  useEffect(() => {
    fetch("http://localhost:5000/item")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data);

        if (data && Array.isArray(data.itens)) {
          setItens(data.itens); // Atualiza os itens com os dados da API
        } else {
          console.error("Erro: a resposta não contém um array válido em 'itens'");
        }
      })
      .catch((error) => console.error("Erro ao buscar itens:", error));
  }, []);

  // Função para adicionar item à tabela de venda
  const adicionarItem = (item, quantidade) => {
    const itemComQuantidade = { ...item, quantidade };
    setItensSelecionados([...itensSelecionados, itemComQuantidade]);
    setMostrarProdutos(false); // Fecha a lista de produtos após a seleção
  };

  // Função para atualizar a quantidade de um item selecionado
  const atualizarQuantidade = (index, novaQuantidade) => {
    const itensAtualizados = [...itensSelecionados];
    itensAtualizados[index].quantidade = novaQuantidade;
    setItensSelecionados(itensAtualizados);
  };

  // Função para remover item da tabela de venda
  const removerItem = (index) => {
    const itensAtualizados = itensSelecionados.filter((_, i) => i !== index);
    setItensSelecionados(itensAtualizados);
  };

  // Função para calcular o total
  const calcularTotal = () => {
    return itensSelecionados
      .reduce((total, item) => total + item.quantidade * item.preco_unitario, 0)
      .toFixed(2);
  };

  // Função de resetar todos os campos
  const resetarCampos = () => {
    setCpf(""); // Limpa o CPF
    setFormaPagamento(""); // Limpa a forma de pagamento
    setItensSelecionados([]); // Limpa os itens selecionados
    setMostrarProdutos(false); // Fecha a lista de produtos
  };

  // Função para cadastrar a venda no novo formato
  const cadastrarVenda = async (cpfCliente, formaPag, valorTotal) => {
    // Concatena os nomes dos itens selecionados
    const itensString = itensSelecionados.map(item => item.nome).join(", ");
    
    // Mapeia o valor selecionado para o formato esperado
    let tipoPagamento;
    if (formaPag === "cartao") {
      tipoPagamento = "Cartão de Crédito";
    } else if (formaPag === "pix") {
      tipoPagamento = "PIX";
    } else if (formaPag === "dinheiro") {
      tipoPagamento = "Dinheiro";
    } else {
      tipoPagamento = formaPag;
    }
    
    const venda = {
      cpfCliente: cpfCliente,
      cpfFuncionario: localStorage.getItem("cpf"),
      itens: itensString,
      valor: parseFloat(valorTotal),
      tipoPagamento: tipoPagamento
    };

    try {
      const response = await fetch("http://localhost:5000/cadvenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(venda)
      });

      if (response.ok) {
        alert("Venda cadastrada com sucesso!");
        resetarCampos(); // Limpa os campos após o cadastro
      } else {
        throw new Error("Erro ao cadastrar a venda");
      }
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: "1", display: "flex" }}>
        <div style={{ width: "50%", paddingRight: "20px", marginRight: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h1>Venda</h1>

          <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", flexGrow: 1, backgroundColor: '#d3d3d3' }}>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
              <thead>
                <tr style={{ backgroundColor: "#800000", color: "white" }}>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {itensSelecionados.length > 0 ? (
                  itensSelecionados.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nome}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantidade}
                          min="1"
                          onChange={(e) => atualizarQuantidade(index, e.target.value)}
                          style={{ width: "60px", textAlign: "center" }}
                        />
                      </td>
                      <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                      <td>
                        <button onClick={() => removerItem(index)} style={{ color: "red", cursor: "pointer" }}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Nenhum item selecionado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: "20px" }}>Total: R$ {calcularTotal()}</h3>
        </div>

        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: "85px", display: "flex", justifyContent: "flex-start", gap: "20px" }}>
            <button
              style={{ backgroundColor: '#d3d3d3', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => setMostrarProdutos(true)} // Abre a lista de produtos
            >
              <img src={cesta} alt="Produto" style={{ width: '100px', height: '100px' }} />
            </button>
          </div>

          {mostrarProdutos && (
            <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3', marginTop: "20px" }}>
              <h2>Selecione um Produto</h2>
              <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                  <tr style={{ backgroundColor: "#800000", color: "white" }}>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Adicionar</th>
                  </tr>
                </thead>
                <tbody>
                  {itens && itens.length > 0 ? (
                    itens.map((item) => (
                      <tr key={item.codigo_barras}>
                        <td>{item.nome}</td>
                        <td>{`R$ ${item.preco_unitario.toFixed(2)}`}</td>
                        <td>
                          <input type="number" min="1" defaultValue="1" style={{ width: "60px", textAlign: "center" }} id={`quantidade-${item.codigo_barras}`} />
                        </td>
                        <td>
                          <button onClick={() => {
                            const quantidade = parseInt(document.getElementById(`quantidade-${item.codigo_barras}`).value, 10);
                            adicionarItem(item, quantidade);
                          }}>
                            Adicionar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Nenhum produto disponível</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
            <h2>Informações do Cliente</h2>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              style={{ padding: "8px", marginRight: "10px" }}
            />
            <button style={{ padding: "8px", backgroundColor: "green", color: "white" }}>Adicionar Cliente</button>
          </div>

          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: '5px', backgroundColor: '#d3d3d3' }}>
            <h2>Pagamento</h2>
            <select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              style={{ padding: "8px" }}
            >
              <option value="">Selecione a forma de pagamento</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <button onClick={resetarCampos} style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
              Cancelar
            </button>
            <button
              style={{ padding: "10px", backgroundColor: "green", color: "white" }}
              onClick={() => cadastrarVenda(cpf, formaPagamento, calcularTotal())}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venda;
