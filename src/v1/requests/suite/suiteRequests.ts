import { request } from 'src/helpers';
import { ITokenResponse } from 'src/types';

const baseUrl = new URL(process.env.SUITE_URL);

export const getTokens = async () => {
  baseUrl.pathname = '/access_token';
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SUITE_CLIENT_ID,
      client_secret: process.env.SUITE_CLIENT_SECRET,
    }),
  };

  return request<Omit<ITokenResponse, 'refresh_token'>>(baseUrl, options);
};

export const createNewModule = async (accessToken: string, args: any) => {
  baseUrl.pathname = '/V8/module';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(baseUrl, options);
};

export const createRelationship = async (
  accessToken: string,
  moduleName: string,
  id: string,
  args: any,
) => {
  baseUrl.pathname = `/V8/module/${moduleName}/${id}/relationships`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(baseUrl, options);
};

export const updateModule = async (accessToken: string, args: any) => {
  baseUrl.pathname = '/V8/module';
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(baseUrl, options);
};

export const getFilteredAccounts = async (
  accessToken: string,
  name: string,
  email: string,
) => {
  baseUrl.pathname = '/V8/module/Accounts';
  baseUrl.search = new URLSearchParams(
    `?filter[name][eq]=${name}&filter[operator]=and&filter[email1][eq]=${email}`,
  ).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(baseUrl, options);
};

export const getFilteredContacts = async (
  accessToken: string,
  phone: string,
  email: string,
) => {
  baseUrl.pathname = '/V8/module/Contacts';
  baseUrl.search = new URLSearchParams(
    `?filter[phone_mobile][eq]=${phone}&filter[operator]=and&filter[email1][eq]=${email}`,
  ).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(baseUrl, options);
};

export const getFilteredCategories = async (
  accessToken: string,
  name: string,
) => {
  baseUrl.pathname = '/V8/module/AOS_Product_Categories';
  baseUrl.search = new URLSearchParams(`?filter[name][eq]=${name}`).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(baseUrl, options);
};
