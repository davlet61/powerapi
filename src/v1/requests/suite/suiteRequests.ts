import { request } from '../../../helpers';
import { ITokenResponse } from '../../../types';

const baseUrl = new URL(process.env.SUITE_URL);

export const getTokens = async () => {
  const url = new URL('/access_token', baseUrl);
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SUITE_CLIENT_ID,
      client_secret: process.env.SUITE_CLIENT_SECRET,
    }),
  };

  return request<Omit<ITokenResponse, 'refresh_token'>>(url, options);
};

export const createNewModule = async (accessToken: string, args: any) => {
  const url = new URL('/V8/module', baseUrl);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(url, options);
};

export const createRelationship = async (
  accessToken: string,
  moduleName: string,
  id: string,
  args: any,
) => {
  const url = new URL(`/V8/module/${moduleName}/${id}/relationships`, baseUrl);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(url, options);
};

export const updateModule = async (accessToken: string, args: any) => {
  const url = new URL('/V8/module', baseUrl);
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(url, options);
};

export const getFilteredAccounts = async (
  accessToken: string,
  name: string,
  email: string,
) => {
  const url = new URL('/V8/module/Accounts', baseUrl);
  url.search = new URLSearchParams(
    `?filter[name][eq]=${name}&filter[operator]=and&filter[email1][eq]=${email}`,
  ).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(url, options);
};

export const getFilteredContacts = async (
  accessToken: string,
  phone: string,
  email: string,
) => {
  const url = new URL('/V8/module/Contacts', baseUrl);
  url.search = new URLSearchParams(
    `?filter[phone_mobile][eq]=${phone}&filter[operator]=and&filter[email1][eq]=${email}`,
  ).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return request<any>(url, options);
};

export const getFilteredCategories = async (
  accessToken: string,
  name: string,
) => {
  const url = new URL('/V8/module/AOS_Product_Categories', baseUrl);
  url.search = new URLSearchParams(`?filter[name][eq]=${name}`).toString();

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request<any>(url, options);
};
