import { RowDataPacket } from "mysql2";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
import { updateType, user, userDetails } from "../../domain/models/user";
import conn from "../config/db";
import {
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByUsernameQuery,
  updateUserRoleQuery,
} from "./sqlQueries";
import { wrapTransaction } from "../helpers/middleware/transaction";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { User } from "../helpers/orm/typeorm/entities/user";

export const userRepo: UserRepoPort = {
  wrapTransaction,

  getDetails: async (entityManager: EntityManager): Promise<user[]> => {

    const data: user[] = await entityManager
      .createQueryBuilder()
      .select([
        "user.id",
        "user.username",
        "user.email",
        "user.role",
        "user.password",
      ])
      .from(User, "user")
      .getMany();

    return data as user[];
  },

  getUserById: async (
    id: number,
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
      .where("user.id = :id", { id })
      .getOne();

    return data as user;
  },
  deleteUsers: async (
    id: number,
    entityManager: EntityManager
  ): Promise<void> => {

    await entityManager
      .createQueryBuilder()
      .delete()
      .from(User, "user")
      .where("user.id = :id", { id })
      .execute();

  },
  updateUsers: async (
    updateData: updateType,
    id: number,
    entityManager: EntityManager
  ): Promise<void> => {
    // const result = await conn.query(updateUserRoleQuery, [updateData, id]);
    await entityManager
    .createQueryBuilder()
    .update(User)
    .set(updateData)
    .where("id = :id", { id: updateData.id })
    .execute();

  },
};
