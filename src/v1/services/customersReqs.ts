import axios from 'axios';

export const createCustomer = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/customer',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCustomers = async (accessToken: string, limit: string, skip: string) => {
  const options = {
    method: 'GET',
    url: `/customer/?$orderby=Code&$top=${limit}&$skip=${skip}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCustomerByName = async (accessToken: string, name: string) => {
  const options = {
    method: 'GET',
    url: `/customer?$filter=(tolower(Name) eq '${name}')`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/customer/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const deleteCustomerById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    url: `/customer/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};