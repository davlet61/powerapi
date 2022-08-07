import { URLSearchParams } from 'url';
import path from 'path';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

config({ path: path.resolve(__dirname, '../.env') });

const { PO_URL, PO_APP_KEY, PO_CLIENT_KEY } = process.env;
const BASE64_AUTH = Buffer.from(`${PO_APP_KEY}:${PO_CLIENT_KEY}`).toString('base64');

const parseUrlParams = <TParams>(params: TParams): URLSearchParams => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    urlParams.set(key, value);
  });
  return urlParams;
};

export const getToken = async (url: string) => {
  const params = parseUrlParams({ grant_type: 'client_credentials' });
  const options = {
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASE64_AUTH}`,
    },
    data: params.toString(),
  };

  const res = await axios(options);
  const { data } = res;
  return data;
};

export const getTokenWithRefresh = async (url: string, refreshToken: string) => {
  const params = parseUrlParams({
    grant_type: 'client_credentials',
    refresh_token: refreshToken,
  });
  const options = {
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASE64_AUTH}`,
    },
    body: params.toString(),
  };

  const res = await axios(options);
  const { data } = res;
  return data;
};

export const getAuthToken = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getToken(PO_URL!);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
