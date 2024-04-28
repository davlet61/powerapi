import { request } from 'src/helpers';

export const getToken = async () => {
  const data = JSON.stringify({
    email: process.env.SVENN_USER,
    password: process.env.SVENN_USER_PASS,
  });
  const url = `${process.env.SVENN_URL}/login`;
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
