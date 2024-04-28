import { request } from '../../../helpers';

export const createTask = async (accessToken: string, args: any) => {
  const url = new URL('/task', process.env.SVENN_URL);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(url, options);
};
