import { request } from "src/helpers";

const baseUrl = new URL(process.env.SVENN_URL);

export const createProject = async (accessToken: string, args: any) => {
  baseUrl.pathname = '/project';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(args),
  };
  return request<any>(bseUrl, options);
};

export const getProjects = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  baseUrl.pathname = '/Project/?';
  baseUrl.search = new URLSearchParams({
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
  return request(baseUrl, options);
};

export const getProjectByName = async (accessToken: string, name: string) => {
  baseUrl.pathname = '/Project';
  baseUrl.search = new URLSearchParams(`?$filter=(tolower(Name) eq '${name}')`).toString();
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};

export const getProjectById = async (accessToken: string, id: string) => {
  baseUrl.pathname = `/Project/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};

export const deleteProjectById = async (accessToken: string, id: string) => {
  baseUrl.pathname = `/Project/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return request(baseUrl, options);
};
