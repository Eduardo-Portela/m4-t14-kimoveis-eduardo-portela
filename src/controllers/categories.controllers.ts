import { Request, Response } from "express";
import {
  ICreateCategory,
  IRealEstateResponseArray,
  IRealEstateResponseArrayCategories,
  IReturnCategory,
  IReturnCategoryArray,
} from "../interfaces";
import {
  createCategoryServices,
  getAllCategoriesServices,
  getRealEstatesByCategoryServices,
} from "../services/categories";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: ICreateCategory = req.body;

  const newCategory: IReturnCategory = await createCategoryServices(
    categoryData
  );

  return res.status(201).json(newCategory);
};

const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCategories: IReturnCategoryArray = await getAllCategoriesServices();
  return res.json(allCategories);
};

const getRealEstateByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);

  const realEstateByCategories: IRealEstateResponseArrayCategories =
    await getRealEstatesByCategoryServices(categoryId);

  return res.json(realEstateByCategories);
};

export {
  createCategoryController,
  getAllCategories,
  getRealEstateByCategoryController,
};
