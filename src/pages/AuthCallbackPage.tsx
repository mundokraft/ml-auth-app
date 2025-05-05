import { useEffect, useState } from 'react';

const AuthCallbackPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      setError('Código de autorização não encontrado na URL.');
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch('/.netlify/functions/auth-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error('Erro ao trocar o código por um token: ' + errText);
        }

        const data = await response.json();
        console.log('Token recebido:', data);
        localStorage.setItem('ml_token', JSON.stringify(data));
        setSuccess(true);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Erro desconhecido');
      }
    };

    fetchToken();
  }, []);

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>❌ Erro: {error}</div>;
  }

  if (success) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>✅ Autenticado com sucesso!</div>;
  }

  return <div style={{ textAlign: 'center', marginTop: '20%' }}>🔄 Autenticando...</div>;
};

export default AuthCallbackPage;
