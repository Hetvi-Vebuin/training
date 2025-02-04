import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
import { user } from "../../domain/models/user";
import conn from "../config/db";
import { createUserQuery, getUserByUsernameQuery } from "./sqlQueries";

export const authRepo: AuthRepoPort = {
  loginDetail: async (userName): Promise<user[]> => {
    const data = await conn.query(getUserByUsernameQuery, [userName]);
    return data[0] as user[];
  },
  registerDetail: async (username, password, role): Promise<void> => {
    await conn.execute(createUserQuery, [username, password, role]);
  },
  getDetailByUsername: async (username): Promise<user[]> => {
    const data = await conn.query(getUserByUsernameQuery, [username]);
    return data[0] as user[];
  },
};
