import { NextFunction, Request, Response } from 'express';
import { writeFile } from 'fs/promises';
import path from 'path';

export const axiosRequest = async <T>(
  options: RequestInfo,
): Promise<T> => {
  try {
    const res = await fetch(options);
    return await res.json() as T;
  } catch (error: any) {
    writeFile(
      path.join(process.cwd(), 'powerapi.log'),
      JSON.stringify(error, null, 4),
    );
    return error.message;
  }
};

// prettier-ignore
export const forceHttps = (
  req: Request,
  res: Response,
  next: NextFunction,
) => (req.secure ? next() : res.redirect(301, `https://${req.headers.host}${req.url}`));
