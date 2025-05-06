exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método não permitido' }),
      };
    }
  
    const body = JSON.parse(event.body || '{}');
    const code = body.code;
  
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Código de autorização ausente' }),
      };
    }
  
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.VITE_MELI_CLIENT_ID);
    params.append('client_secret', process.env.MELI_CLIENT_SECRET); // ← SEM VITE_
    params.append('code', code);
    params.append('redirect_uri', process.env.VITE_REDIRECT_URI);
  
    try {
      const response = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Erro ao trocar o código por um token: ' + errorText }),
        };
      }
  
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erro inesperado: ' + error.message }),
      };
    }
  };
  