import { request } from 'src/helpers';

const baseUrl = new URL(process.env.SVENN_URL);

export const createClient = async (accessToken: string, args: any) => {
  baseUrl.pathname = '/client';
  const options = {
    method: 'POST',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(baseUrl, options);
};

export const getClients = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  baseUrl.pathname = '/Client/?';
  baseUrl.search = new URLSearchParams({
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
  return request(baseUrl, options);
};

export const getClientByName = async (accessToken: string, name: string) => {
  baseUrl.pathname = '/Client';
  baseUrl.search = new URLSearchParams(
    `?$filter=(tolower(Name) eq '${name}')`,
  ).toString();
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};

export const getClientById = async (accessToken: string, id: string) => {
  baseUrl.pathname = `/Client/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};

export const deleteClientById = async (accessToken: string, id: string) => {
  baseUrl.pathname = `/Client/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};
