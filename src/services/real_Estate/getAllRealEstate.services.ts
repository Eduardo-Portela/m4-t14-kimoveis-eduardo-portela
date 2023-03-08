import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { IRealEstateResponseArray } from "../../interfaces";

const getAllRealEstatesServices = async (): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const gettingAllRealEstates: IRealEstateResponseArray =
    await realEstateRepository.find({
      relations: {
        address: true,
      },
    });

  return gettingAllRealEstates;
};

export { getAllRealEstatesServices };
