const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { code } = JSON.parse(event.body);

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Código de autorização ausente' }),
      };
    }

    const CLIENT_ID = process.env.MELI_CLIENT_ID;
    const CLIENT_SECRET = process.env.MELI_CLIENT_SECRET;
    const REDIRECT_URI = process.env.MELI_REDIRECT_URI;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);

    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 400,
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
};
