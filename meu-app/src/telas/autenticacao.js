// useVerificarAutenticacao.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useVerificarAutenticacao() {
  const navigate = useNavigate();

  useEffect(() => {
    const cpf = localStorage.getItem('cpf'); // Verifica se o CPF está no localStorage

    // Se não encontrar o CPF, redireciona para a página de login
    /* if (!cpf) {
      navigate('/');
    } */
  }, [navigate]); // Dependência de `navigate` para redirecionamento
}

export default useVerificarAutenticacao;
