import { NextFunction, Request, Response } from 'express';
import { POProductGroupT, POProductsType } from '$types';
import { axiosRequest } from '$helpers';

export const syncProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const options = {
      method: 'GET',
      url: `/poweroffice/products?limit=${limit}&skip=${skip}`,
      baseURL: process.env.POWERAPI_URL,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
    };
    const { data: products } = await axiosRequest<POProductsType>(options);
    const result = await Promise.all(
      products.map(async (p) => {
        const SCategoryOpts = {
          method: 'GET',
          url: '/suitecrm/products/categories',
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: { productGroupId: p.productGroupId },
        };

        const { data: category } = await axiosRequest<any>(SCategoryOpts);

        const SProductOpts = {
          method: 'POST',
          url: '/poweroffice/products',
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: {
            ...p,
            categoryName: category.attributes.name,
            categoryId: category.id,
          },
        };
        return axiosRequest<any>(SProductOpts);
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
    const options = {
      method: 'GET',
      url: `/poweroffice/products/groups?limit=${limit}&skip=${skip}`,
      baseURL: process.env.POWERAPI_URL,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
    };
    const { data: groups } = await axiosRequest<POProductGroupT>(options);
    const result = await Promise.all(
      groups.map(async (g) => {
        const suiteOpts = {
          method: 'POST',
          url: '/suitecrm/products/categories',
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: { name: g.name },
        };
        return axiosRequest<any>(suiteOpts);
      }),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
