export async function handler(event) {
    try {
      const { code } = JSON.parse(event.body || '{}');
  
      if (!code) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Código de autorização ausente' }),
        };
      }
  
      const clientId = process.env.MELI_CLIENT_ID;
      const clientSecret = process.env.MELI_CLIENT_SECRET;
      const redirectUri = process.env.VITE_MELI_REDIRECT_URI;
  
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      });
  
      const response = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return {
          statusCode: response.status,
          body: JSON.stringify({ error: 'Erro ao trocar o código por um token', details: data }),
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erro inesperado', details: error.message }),
      };
    }
  }
  