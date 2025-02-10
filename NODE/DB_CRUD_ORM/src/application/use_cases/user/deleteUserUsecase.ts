import { EntityManager } from "typeorm";
import { tokenType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";

export const deleteUserUseCase = async (
  userId: number,
  tokenData: tokenType,
  userRepo: UserRepoPort,
  t: EntityManager
) => {
  if (tokenData.role !== "admin" && tokenData.id !== userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await userRepo.getUserById(userId, t);

  if (!existingUser) {
    throw new Error("User not found");
  }

  await userRepo.deleteUsers(userId, t);
};
