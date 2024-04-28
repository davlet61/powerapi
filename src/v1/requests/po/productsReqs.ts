import { request } from 'src/helpers';

const baseUrl = new URL(process.env.PO_URL);

export const createProduct = async (accessToken: string, args: any) => {
  const url = new URL('/Product', baseUrl);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request(url, options);
};

export const getProductList = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const url = new URL('/Product', baseUrl);
  url.search = new URLSearchParams(
    `?$orderby=Code&$top=${limit}&$skip=${skip}`,
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

export const getProductGroupById = async (accessToken: string, id: string) => {
  const url = new URL(`/ProductGroup/${id}`, baseUrl);
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(url, options);
};

export const getProductByCode = async (accessToken: string, code: string) => {
  const url = new URL('/Product', baseUrl);
  url.search = new URLSearchParams(
    `?$filter=(tolower(Code) eq '${code}')`,
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

export const getProductGroupList = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const url = new URL('/ProductGroup', baseUrl);
  url.search = new URLSearchParams(
    `?$orderby=Code&$top=${limit}&$skip=${skip}`,
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

export const deleteProductById = async (accessToken: string, id: string) => {
  const url = new URL(`/Product/${id}`, baseUrl);
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};
