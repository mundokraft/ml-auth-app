import React from 'react';

const LoginPage = () => {
  const CLIENT_ID = import.meta.env.VITE_MELI_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_MELI_REDIRECT_URI;

  const handleLogin = () => {
    console.log('CLIENT_ID:', CLIENT_ID);
    console.log('REDIRECT_URI:', REDIRECT_URI);

    const authUrl = `https://auth.mercadolibre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Conectar com Mercado Livre</h2>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login Mercado Livre
      </button>
    </div>
  );
};

export default LoginPage;
