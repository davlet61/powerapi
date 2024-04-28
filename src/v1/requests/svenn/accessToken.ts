import { request } from 'src/helpers';

export const getToken = async () => {
  const data = JSON.stringify({
    email: process.env.SVENN_USER,
    password: process.env.SVENN_USER_PASS,
  });
  const url = new URL('/login', process.env.SVENN_URL);
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  return request<any>(url, options);
};
