import { NextFunction, Request, Response } from 'express';
import { IError } from '$types';
import {
  getTokens,
  getTokenWithRefresh,
  keysToBase64,
} from '../../requests/po/accessToken';

export const getAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { application_key, client_key } = req.headers;
    if (!application_key || !client_key) {
      const err: IError = new Error('Missing Application Key or Client Key');
      err.status = 400;
      next(err);
    }
    const base64 = keysToBase64(
      application_key as string,
      client_key as string,
    );
    const response = await getTokens(base64);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refresh_token } = req.headers;
    if (!refresh_token) {
      const err: IError = new Error('Missing Refresh Token in headers');
      err.status = 400;
      next(err);
    }
    const response = await getTokenWithRefresh(refresh_token as string);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
