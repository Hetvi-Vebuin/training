import { updateType, user, userDetails } from "../../../../domain/models/user"

export type UserRepoPort={
    getDetails():Promise<userDetails[]>
    getUserById(id:number):Promise<user[]>
    deleteUsers(id:number):Promise<void>
    updateUsers(updateData:updateType, id:number):Promise<void>
}
