import jwt from "jsonwebtoken";
import { AuthRepoPort } from "../../port/repositories/auth/auth_repo.port";
import { user } from "../../../domain/models/user";
import { EntityManager } from "typeorm";

export const loginUseCase = async (
  email: string,
  password: string,
  authRepo: AuthRepoPort,
  t: EntityManager
): Promise<{}> => {
  const data: user | null = await authRepo.loginDetail(email, t);
  if (!data) {
    const error = new Error("User Not Found");
    throw error;
  }
  let isValid=false;
  if(password==data.password){
    isValid=true;
  }
  if (!isValid) {
    const error = new Error("Invalid password");
    throw error;
  }
  const token = jwt.sign(
    { id: data.id, role: data.role },
    process.env.JWT_SECRET ?? "EMP0375",
    {
      expiresIn: "1h",
    }
  );
  return { token };
};
