import { request } from 'src/helpers';

const baseUrl = new URL(process.env.SVENN_URL);

export const createProject = async (accessToken: string, args: any) => {
  const url = new URL('/project', baseUrl);
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

export const getProjects = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const url = new URL('/Project/?', baseUrl);
  url.search = new URLSearchParams({
    $orderby: 'Code',
    $top: limit,
    $skip: skip,
  }).toString();
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const getProjectByName = async (accessToken: string, name: string) => {
  const url = new URL('/Project', baseUrl);
  url.search = new URLSearchParams(
    `?$filter=(tolower(Name) eq '${name}')`,
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

export const getProjectById = async (accessToken: string, id: string) => {
  const url = new URL(`/Project/${id}`, baseUrl);
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};

export const deleteProjectById = async (accessToken: string, id: string) => {
  const url = new URL(`/Project/${id}`, baseUrl);
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(url, options);
};
