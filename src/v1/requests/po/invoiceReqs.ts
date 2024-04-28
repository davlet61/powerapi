import { request } from '../../../helpers';

const baseUrl = new URL(process.env.PO_URL);

export const getInvoiceById = async (accessToken: string, id: string) => {
  const url = new URL(`/OutgoingInvoice/${id}`, baseUrl);
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const getInvoiceList = async (accessToken: string) => {
  const url = new URL('/OutgoingInvoice/List', baseUrl);
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const createInvoice = async (accessToken: string, args: any) => {
  const url = new URL('/OutgoingInvoice', baseUrl);
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
