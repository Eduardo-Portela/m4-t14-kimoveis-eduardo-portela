import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IUserReturn, IUserUpdate } from "../../interfaces";
import { returnUserSchema } from "../../schemas";

const editUserServices = async (
  loggedUserId: number,
  userId: number,
  userData: IUserUpdate
): Promise<IUserReturn | undefined> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const verifyLoggedUserIsAdmin: User | null = await userRepository.findOne({
    where: {
      id: loggedUserId,
    },
  });

  if (verifyLoggedUserIsAdmin?.admin) {
    const oldUserData: User | null = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (oldUserData) {
      const updatingUser: User = userRepository.create({
        ...oldUserData,
        ...userData,
      });

      await userRepository.save(updatingUser);

      const updatedUser: IUserReturn = returnUserSchema.parse(updatingUser);

      return updatedUser;
    }
  } else {
    const oldUserData: User | null = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (oldUserData?.id === verifyLoggedUserIsAdmin?.id) {
      const updatingUser: User = userRepository.create({
        ...oldUserData,
        ...userData,
      });

      await userRepository.save(updatingUser);

      const updatedUser: IUserReturn = returnUserSchema.parse(updatingUser);

      return updatedUser;
    } else {
      throw new AppError("Insufficient permission", 403);
    }
  }
};

export { editUserServices };
