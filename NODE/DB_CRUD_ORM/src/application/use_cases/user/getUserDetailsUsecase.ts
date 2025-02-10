import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";

export const getUserDetailsUseCase = async (
  userId: number,
  role: string,
  isAdmin: boolean | undefined,
  userRepo: UserRepoPort,
  t: EntityManager
) => {
  const data = await userRepo.getUserById(userId, t);
  console.log(data[0]);
  if (isAdmin) {
    if (role === "admin") {
      // If isAdmin is true and role is admin, return all user details
      return await userRepo.getDetails(t);
    } else if (role === "user") {
      // If isAdmin is true and role is user, return only this user's details
      return await userRepo.getUserById(userId, t);
    }
  } else {
    return await userRepo.getUserById(userId, t);
  }
};
