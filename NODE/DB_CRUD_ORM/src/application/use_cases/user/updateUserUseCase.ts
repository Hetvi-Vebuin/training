import { EntityManager } from "typeorm";
import { tokenType, updateType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
import { authRepo } from "../../../infrastructure/reposiritories/auth.repo";

export const updateUserUseCase = async (
  tokenData: tokenType,
  updateData: updateType,
  userRepo: UserRepoPort,
  t: EntityManager
) => {

  if (tokenData.id !== updateData.id) {
    throw new Error("Unauthorized");
  }
  const existingUser = await userRepo.getUserById(updateData.id, t);
  if (!existingUser) {
    throw new Error("User not found");
  }
  if(updateData.email) {
    const existingUser = await authRepo.getDetailByEmail(updateData.email, t);
    if (existingUser && existingUser.id !== updateData.id) {
      throw new Error('Email is already taken');
    }
  }
  await userRepo.updateUsers(updateData, t);
};
