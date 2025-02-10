import bcrypt from "bcrypt";
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

  const data = await authRepo.loginDetail(email, t);
  if(!data){
    throw new Error("Email not found");
  }
  
  const isValid = await bcrypt.compare(password, data.password);

  if (!isValid) {
    throw new Error("invalid password");
  }
  const token = jwt.sign(
    { id: data.id, role: data.role },
    process.env.JWT_SECRET || "EMP0375",
    {
      expiresIn: "1h",
    }
  );
  return { token };
};
