import { EntityManager } from "typeorm";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
import { registerType, user } from "../../domain/models/user";
import { wrapTransaction } from "../helpers/middleware/transaction";
import { User } from "../helpers/orm/typeorm/entities/user";

export const authRepo: AuthRepoPort = {

  wrapTransaction,

  loginDetail:async (
    email,
    entityManager: EntityManager
  ): Promise<user> => {
    const data = await entityManager
      .createQueryBuilder()
      .select([
        "user.id",
        "user.username",
        "user.email",
        "user.role",
        "user.password",
      ])
      .from(User, "user")
      .where("user.email = :email", { email })
      .getOne();
    return data as user;
  },

  registerDetail: async (
    email: string,
    username: string,
    password: string,
    role: string,
    entityManager: EntityManager
  ): Promise<void> => {
    await entityManager
      .getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: username,
        email: email,
        role: role as "admin" | "user",
        password: password,
      })
      .execute();
  },
  getDetailByEmail: async (
    email,
    entityManager: EntityManager
  ): Promise<user> => {
    const data = await entityManager
      .createQueryBuilder()
      .select([
        "user.id",
        "user.username",
        "user.email",
        "user.role",
        "user.password",
      ])
      .from(User, "user")
      .where("user.email = :email", { email })
      .getOne();
    return data as user;
  },
};
