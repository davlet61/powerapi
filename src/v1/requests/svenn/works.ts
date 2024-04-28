import { request } from "src/helpers";

export const createWork = async (accessToken: string, args: any) => {
  const url = new URL('/work', process.env.SVENN_URL);
  const options = {
    method: 'POST',
    url: '/work',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request(url, options);
};
