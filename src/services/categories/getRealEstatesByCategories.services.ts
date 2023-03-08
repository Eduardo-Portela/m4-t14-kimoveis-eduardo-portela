import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import {
  IRealEstateResponseArray,
  IRealEstateResponseArrayCategories,
} from "../../interfaces";

const getRealEstatesByCategoryServices = async (
  categoryId: number
): Promise<IRealEstateResponseArrayCategories> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const verifyCategoryExists: Category | null =
    await categoryRepository.findOneBy({
      id: categoryId,
    });

  if (!verifyCategoryExists) {
    throw new AppError("Category not found", 404);
  }

  const gettingRealEstates: IRealEstateResponseArray | null =
    await realEstateRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });

  const returnRealEstates: IRealEstateResponseArrayCategories = {
    id: categoryId,
    name: verifyCategoryExists.name,
    realEstate: gettingRealEstates,
  };

  return returnRealEstates;
};

export { getRealEstatesByCategoryServices };
