import { Request, Response } from "express";
import {
  IUser,
  IUserReturn,
  IUserReturnArray,
  IUserUpdate,
} from "../interfaces";
import {
  createUserServices,
  editUserServices,
  getAllUsersServices,
  deleteUserServices,
} from "../services/users";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;

  const newUser: IUserReturn = await createUserServices(userData);

  return res.status(201).json(newUser);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const AllUsers: IUserReturnArray = await getAllUsersServices();

  return res.status(200).json(AllUsers);
};

const edituserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.user.id);
  const loggedUserId: number = Number(req.user.id);
  const userId: number = Number(req.params.id);
  const userData: IUserUpdate = req.body;

  const updatedUser: IUserReturn | undefined = await editUserServices(
    loggedUserId,
    userId,
    userData
  );

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);

  await deleteUserServices(userId);

  return res.status(204).send();
};

export {
  createUserController,
  getAllUsersController,
  edituserController,
  deleteUserController,
};
