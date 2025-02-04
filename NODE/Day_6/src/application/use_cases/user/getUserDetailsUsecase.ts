import { UserRepoPort } from "../../port/repositories/user/user_repo.port";

export const getUserDetailsUsecase = async (
  userId: number,
  role: string,
  userRepo: UserRepoPort
) => {
  const data = await userRepo.getUserById(userId);
  console.log(data[0]);
  if (role === "admin") {
    return await userRepo.getDetails();
  } else {
    return await userRepo.getUserById(userId);
  }
};
