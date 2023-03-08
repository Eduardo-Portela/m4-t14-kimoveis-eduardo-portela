import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const getAllSchedulesByRealEstateIdServices = async (
  realEstateId: number
): Promise<RealEstate | null> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const verifyRealEstateExists: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: realEstateId,
    });

  if (!verifyRealEstateExists) {
    throw new AppError("RealEstate not found", 404);
  }

  const allScheduleRealEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.address", "address")
    .innerJoinAndSelect("realEstate.category", "category")
    .innerJoinAndSelect("realEstate.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .getOne();

  return allScheduleRealEstate;
};

export { getAllSchedulesByRealEstateIdServices };
