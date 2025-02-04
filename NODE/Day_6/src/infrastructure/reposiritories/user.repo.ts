import { RowDataPacket } from "mysql2";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
import { updateType, user, userDetails } from "../../domain/models/user";
import conn from "../config/db";
import { createUserQuery, deleteUserQuery, getAllUsersQuery, getUserByIdQuery, getUserByUsernameQuery, updateUserRoleQuery } from "./sqlQueries";

export const userRepo: UserRepoPort = {
    getDetails: async (): Promise<userDetails[]> => {
        const data = await conn.execute(
            getAllUsersQuery
        );
        return data[0] as userDetails[]
    },
    getUserById: async (id: number): Promise<user[]> => {
        const data = await conn.query(
            getUserByIdQuery,
            [id]
        );
        return data[0] as user[];
    },
    deleteUsers: async (id: number): Promise<void> => {
        const result=await conn.query(
            deleteUserQuery,
            [id]
        );
    },
    updateUsers: async(updateData:updateType,id:number): Promise<void> =>{
        const result=await conn.query(
            updateUserRoleQuery,
            [updateData,id]
        )
    }
};