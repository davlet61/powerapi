import { NextFunction, Request, Response } from 'express';
import { getProductGroupById, getProductGroupList, getProductList } from '@v1/poweroffice/requests/productsReqs';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const products = await getProductList(access_token, limit, skip);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

export const getProductGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const groups = await getProductGroupList(access_token, limit, skip);
    return res.json(groups);
  } catch (error) {
    return next(error);
  }
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await getProductGroupById(access_token, req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
