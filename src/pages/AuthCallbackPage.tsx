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
        const response = await fetch('https://api.mercadolibre.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_MELI_CLIENT_ID!,
            client_secret: import.meta.env.VITE_MELI_CLIENT_SECRET!,
            code,
            redirect_uri: `${window.location.origin}/auth`,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao trocar o código por um token');
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
