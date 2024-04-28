import { request } from 'src/helpers';

const baseUrl = new URL(process.env.SVENN_URL);

export const createClient = async (accessToken: string, args: any) => {
  const url = new URL('/client', baseUrl);
  const options = {
    method: 'POST',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(url, options);
};

export const getClients = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const url = new URL('/Client/?', baseUrl);
  url.search = new URLSearchParams({
    $orderby: 'Code',
    $top: limit,
    $skip: skip,
  }).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const getClientByName = async (accessToken: string, name: string) => {
  const url = new URL('/Client', baseUrl);
  url.search = new URLSearchParams(
    `?$filter=(tolower(Name) eq '${name}')`,
  ).toString();
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const getClientById = async (accessToken: string, id: string) => {
  const url = new URL(`/Client/${id}`, baseUrl);
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const deleteClientById = async (accessToken: string, id: string) => {
  const url = new URL(`/Client/${id}`, baseUrl);
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};
