import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";

const deleteUserServices = async (userId: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  await userRepository.softRemove(findUser!);
};

export { deleteUserServices };
