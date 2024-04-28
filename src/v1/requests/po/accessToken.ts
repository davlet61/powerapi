import { request } from 'src/helpers';
import { ITokenResponse } from 'src/types';

export const keysToBase64 = (
  applicationKey: string,
  clientKey: string,
): string => Buffer.from(`${applicationKey}:${clientKey}`).toString('base64');

export const getTokens = async (base64: string) => {
  const url = new URL('/oauth/token', process.env.PO_URL);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: `Basic ${base64}`,
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  };

  return request<ITokenResponse>(url, options);
};

export const getTokenWithRefresh = async (refreshToken: string) => {
  const url = new URL('/oauth/token', process.env.PO_URL);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  };

  return request<ITokenResponse>(url, options);
};
