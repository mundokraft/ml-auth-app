exports.handler = async function(event) {
    const body = new URLSearchParams(event.body);
  
    const code = body.get('code');
  
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Código de autorização ausente' }),
      };
    }
  
    try {
      const res = await fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.VITE_MELI_CLIENT_ID,
          client_secret: process.env.MELI_CLIENT_SECRET,
          code,
          redirect_uri: process.env.VITE_REDIRECT_URI,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return {
          statusCode: res.status,
          body: JSON.stringify({ error: data }),
        };
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erro interno: ' + error.message }),
      };
    }
  };
  