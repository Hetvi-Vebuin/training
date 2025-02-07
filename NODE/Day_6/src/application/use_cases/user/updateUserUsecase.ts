import { tokenType, updateType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
export const updateUserUsecase = async (
  tokenData: tokenType,
  updateData: updateType,
  userRepo: UserRepoPort
) => {
  if (tokenData.role !== "admin" && tokenData.id !== updateData.id) {
    throw new Error("Unauthorized");
  }
  const existingUser = await userRepo.getUserById(updateData.id);
  if (existingUser[0] == undefined) {
    throw new Error("User not found");
  }
  await userRepo.updateUsers(updateData, updateData.id);
};
