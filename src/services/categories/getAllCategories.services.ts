import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Category } from "../../entities";
import { IReturnCategoryArray } from "../../interfaces";
import { returnAllCategoriesSchema } from "../../schemas";

const getAllCategoriesServices = async (): Promise<IReturnCategoryArray> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const getCategories: Array<Category> = await categoriesRepository.find();

  const allCategories: Array<Category> =
    returnAllCategoriesSchema.parse(getCategories);

  return allCategories;
};

export { getAllCategoriesServices };
