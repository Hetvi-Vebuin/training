import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepoPort } from "../../port/repositories/auth/auth_repo.port";
import { user } from "../../../domain/models/user";

export const loginUsecase = async (
  username: string,
  password: string,
  authRepo: AuthRepoPort
): Promise<{}> => {

  const data = await authRepo.loginDetail(username);

  
  const isvalid = await bcrypt.compare(password, data[0].password);

  if (!isvalid) {
    throw new Error("invalid password");
  }
  const token = jwt.sign(
    { id: data[0].id, role: data[0].role },
    process.env.JWT_SECRET || "EMP0375",
    {
      expiresIn: "1h",
    }
  );
  return { token };
};
