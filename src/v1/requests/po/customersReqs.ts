import { request } from 'src/helpers';

export const createCustomer = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args) || args,
  };
  const url = new URL(process.env.PO_URL);
  url.pathname = '/Customer';

  return request(url, options);
};

export const getCustomers = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const url = new URL(process.env.PO_URL);
  url.pathname = '/Customer/?';
  url.search = new URLSearchParams({
    $orderby: 'Code',
    $top: limit,
    $skip: skip,
  }).toString();

  return request(url, options);
};

export const getCustomerByName = async (accessToken: string, name: string) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const url = new URL(process.env.PO_URL);
  url.pathname = '/Customer';
  url.search = new URLSearchParams(
    `?$filter=(tolower(Name) eq '${name}')`,
  ).toString();

  return request(url, options);
};

export const getCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const url = new URL(process.env.PO_URL);
  url.pathname = `/Customer/${id}`;

  return request(url, options);
};

export const deleteCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const url = new URL(process.env.PO_URL);
  url.pathname = `/Customer/${id}`;

  return request(url, options);
};
