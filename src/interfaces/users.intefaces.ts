import { userSchema, returnUserSchema, returnAllUsersSchema } from "../schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof returnUserSchema>;
type IUserReturnArray = z.infer<typeof returnAllUsersSchema>;
type IUserUpdate = DeepPartial<IUser>;

export { IUser, IUserReturn, IUserReturnArray, IUserUpdate };
