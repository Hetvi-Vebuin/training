import { tokenType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";

export const deleteUserUsecase =
  async (userId: number, tokenData:tokenType, userRepo: UserRepoPort)  => {
    if (tokenData.role !== "admin" && tokenData.id !== userId) {
      throw new Error("Unauthorized");
    }

    const existingUser = await userRepo.getUserById(userId);

    if (!existingUser[0]) {
        throw new Error("User not found");
    }

    await userRepo.deleteUsers(userId);
  };
