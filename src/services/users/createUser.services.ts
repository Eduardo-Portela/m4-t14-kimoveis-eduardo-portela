import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { IUser, IUserReturn } from "../../interfaces";
import { returnUserSchema } from "../../schemas";
import { AppError } from "../../errors";

const createUserServices = async (userData: IUser): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const verifyEmailExists: User | null = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });

  if (verifyEmailExists) {
    throw new AppError("Email already exists", 409);
  }

  const createUser: User = userRepository.create(userData);

  await userRepository.save(createUser);

  const newUser: IUserReturn = returnUserSchema.parse(createUser);

  return newUser;
};

export { createUserServices };
