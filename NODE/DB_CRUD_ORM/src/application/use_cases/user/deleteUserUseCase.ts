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
    const error= new Error("Unauthorized");
    throw error;
  }

  const existingUser = await userRepo.getUserById(userId, t);

  if (!existingUser) {
    const error=new Error("User not found");
    throw error;
  }

  await userRepo.deleteUsers(userId, t);
};
