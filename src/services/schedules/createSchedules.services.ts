import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { User } from "../../entities";
import { Schedule } from "../../entities";
import { IScheduleRequest } from "../../interfaces";
import { AppError } from "../../errors";

const createScheduleServices = async (
  userId: number,
  scheduleData: IScheduleRequest
): Promise<string> => {
  const scheduleDate: Date = new Date(scheduleData.date);
  const dayOfDate: number = scheduleDate.getDay();
  const scheduleHour: number = Number(scheduleData.hour.substring(0, 2));

  if (scheduleHour < 8 || scheduleHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  if (dayOfDate === 0 || dayOfDate === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const verifyScheduleExists: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .innerJoinAndSelect("schedule.realEstate", "realEstate")
    .where("schedule.realEstate = :realEstate", {
      realEstate: scheduleData.realEstateId,
    })
    .andWhere("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .getOne();

  const verifyScheduleByUserExists: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .where("schedule.user = :user", { user: userId })
    .andWhere("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .getOne();

  if (verifyScheduleByUserExists) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (verifyScheduleExists) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const findRealEstate: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: scheduleData.realEstateId,
    });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const findUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newSchedule = scheduleRepository.create({
    date: scheduleData.date,
    hour: scheduleData.hour,
    realEstate: findRealEstate!,
    user: findUser!,
  });

  await scheduleRepository.save(newSchedule);

  const createdMsg: string = "Schedule created";

  return createdMsg;
};

export { createScheduleServices };
