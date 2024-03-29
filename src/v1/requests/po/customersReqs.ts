import { axiosRequest } from '$helpers';

export const createCustomer = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/Customer',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};

export const getCustomers = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const options = {
    method: 'GET',
    url: '/Customer/?',
    params: new URLSearchParams({
      $orderby: 'Code',
      $top: limit,
      $skip: skip,
    }),
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getCustomerByName = async (accessToken: string, name: string) => {
  const options = {
    method: 'GET',
    url: '/Customer',
    params: new URLSearchParams(`?$filter=(tolower(Name) eq '${name}')`),
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/Customer/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const deleteCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    url: `/Customer/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};
