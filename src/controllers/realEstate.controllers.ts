import { Request, Response } from "express";
import {
  IRealEstateRequest,
  IRealEstateResponse,
  IRealEstateResponseArray,
} from "../interfaces";
import {
  createRealEstateServices,
  getAllRealEstatesServices,
} from "../services/real_Estate";

const createRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateDate: IRealEstateRequest = req.body;

  const newRealEstate: IRealEstateResponse = await createRealEstateServices(
    realEstateDate
  );

  return res.status(201).json(newRealEstate);
};

const getAllRealEstatesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const AllRealEstates: IRealEstateResponseArray =
    await getAllRealEstatesServices();

  return res.json(AllRealEstates);
};

export { createRealEstateControllers, getAllRealEstatesControllers };
