import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { IScheduleRequest } from "../interfaces";
import {
  createScheduleServices,
  getAllSchedulesByRealEstateIdServices,
} from "../services/schedules";

const createSchedulesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleData: IScheduleRequest = req.body;
  const userId: number = Number(req.user.id);

  const createdMessage: string = await createScheduleServices(
    userId,
    scheduleData
  );

  return res.status(201).json({ message: createdMessage });
};

const getSchedulesRealEstateById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId = Number(req.params.id);

  const allScheduleRealEstate: RealEstate | null =
    await getAllSchedulesByRealEstateIdServices(realEstateId);

  return res.json(allScheduleRealEstate);
};

export { createSchedulesControllers, getSchedulesRealEstateById };
