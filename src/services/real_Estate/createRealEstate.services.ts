import { AppDataSource } from "../../data-source";
import { FindOperator, Repository } from "typeorm";
import { Address, Category, RealEstate } from "../../entities";
import {
  IAdressRequest,
  IAdressResponse,
  IRealEstateRequest,
  IRealEstateResponse,
} from "../../interfaces";
import { returnRealEstateSchema } from "../../schemas";
import { AppError } from "../../errors";

const createRealEstateServices = async (
  realEstateData: IRealEstateRequest
): Promise<IRealEstateResponse> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const realEstateAdressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    id: realEstateData.categoryId!,
  });

  const verifyAddressExists: Address | null =
    await realEstateAdressRepository.findOne({
      where: {
        street: realEstateData.address.street,
        zipCode: realEstateData.address.zipCode,
        number: realEstateData.address.number!,
        city: realEstateData.address.city,
        state: realEstateData.address.state,
      },
    });

  if (verifyAddressExists) {
    throw new AppError("Address already exists", 409);
  }

  const newAdress: IAdressRequest = realEstateAdressRepository.create({
    ...realEstateData.address,
  });

  await realEstateAdressRepository.save(newAdress);

  const newRealEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: newAdress,
    category: findCategory,
  });

  await realEstateRepository.save(newRealEstate);

  const returnRealEstate: IRealEstateResponse =
    returnRealEstateSchema.parse(newRealEstate);

  return returnRealEstate;
};

export { createRealEstateServices };
