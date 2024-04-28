import { NextFunction, Request, Response } from 'express';
import { request } from '../../../helpers';
import { POProductGroupT, POProductsType } from '../../../types';

export const syncProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const url = new URL(
      `/poweroffice/products?limit=${limit}&skip=${skip}`,
      process.env.POWERAPI_URL,
    );
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token: access_token as string,
      },
    };
    const { data: products } = await request<POProductsType>(url, options);
    const result = await Promise.all(
      products.map(async (p) => {
        const pCategoriesUrl = new URL(
          '/suitecrm/products/categories',
          process.env.POWERAPI_URL,
        );
        const SCategoryOpts = {
          method: 'GET',
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token: access_token as string,
          },
          body: JSON.stringify({ productGroupId: p.productGroupId }),
        };

        const { data: category } = await request<any>(
          pCategoriesUrl,
          SCategoryOpts,
        );

        const pUrl = new URL('/poweroffice/products', process.env.POWERAPI_URL);
        const SProductOpts = {
          method: 'POST',
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token: access_token as string,
          },
          body: JSON.stringify({
            ...p,
            categoryName: category.attributes.name,
            categoryId: category.id,
          }),
        };
        return request<any>(url, SProductOpts);
      }),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const syncProductGroups = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const url = new URL(
      `/poweroffice/products/groups?limit=${limit}&skip=${skip}`,
      process.env.POWERAPI_URL,
    );
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token: access_token as string,
      },
    };
    const { data: groups } = await request<POProductGroupT>(url, options);
    const result = await Promise.all(
      groups.map(async (g) => {
        const pCategoriesUrl = new URL(
          '/suitecrm/products/categories',
          process.env.POWERAPI_URL,
        );
        const suiteOpts = {
          method: 'POST',
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token: access_token as string,
          },
          body: JSON.stringify({ name: g.name }),
        };
        return request<any>(pCategoriesUrl, suiteOpts);
      }),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
