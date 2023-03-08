import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { ICreateCategory, IReturnCategory } from "../../interfaces";
import { returnCategorySchema } from "../../schemas";
import { AppError } from "../../errors";

const createCategoryServices = async (
  categoryData: ICreateCategory
): Promise<IReturnCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const verifyCategoryNameExists: Category | null =
    await categoryRepository.findOne({
      where: {
        name: categoryData.name,
      },
    });

  if (verifyCategoryNameExists) {
    throw new AppError("Category already exists", 409);
  }

  const createCategory: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(createCategory);

  const returnCategory: IReturnCategory =
    returnCategorySchema.parse(createCategory);

  return returnCategory;
};

export { createCategoryServices };
