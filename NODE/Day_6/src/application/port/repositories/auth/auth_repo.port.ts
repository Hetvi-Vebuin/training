import { QueryResult, FieldPacket } from "mysql2"
import { user } from "../../../../domain/models/user"

export type AuthRepoPort={
    loginDetail(userName:string):Promise<user[]>,
    registerDetail(userName:string,password:string,role:string):Promise<void>
    getDetailByUsername(userName:string):Promise<user[]>
}