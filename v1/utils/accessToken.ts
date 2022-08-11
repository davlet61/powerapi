import axios from 'axios';

interface ITokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
}

export const keysToBase64 = (applicationKey: string, clientKey: string): string =>
  Buffer.from(`${applicationKey}:${clientKey}`).toString('base64');

export const getTokens = async (url: string, base64: string) => {
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64}`,
    },
    data: new URLSearchParams({ grant_type: 'client_credentials' }),
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};

export const getTokenWithRefresh = async (url: string, refreshToken: string) => {
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};
