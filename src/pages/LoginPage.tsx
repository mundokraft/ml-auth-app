import { useEffect } from 'react';

const LoginPage = () => {
  const CLIENT_ID = import.meta.env.VITE_MELI_CLIENT_ID;
  const REDIRECT_URI = `${window.location.origin}/auth`;

  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

  useEffect(() => {
    // Apenas para depuração
    console.log("Redirecionando para:", authUrl);
  }, []);

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Login com Mercado Livre</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Conectar com Mercado Livre
      </button>
    </div>
  );
};

export default LoginPage;
