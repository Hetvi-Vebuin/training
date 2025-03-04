import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
import { user } from "../../../domain/models/user";

export const getUserDetailsUseCase = async (
  userId: number,
  role: string,
  isAdmin: boolean | undefined,
  userRepo: UserRepoPort,
  t: EntityManager
) => {
  if (isAdmin && role === "admin") {
    return await userRepo.getDetails(t);
  }
  if (role === "user") {
    const user = await userRepo.getUserById(userId, t);
    if (!user) {
      const error = new Error("User not found");
      throw error;
    }
    return user;
  }
};
