import { EntityManager } from "typeorm"
import { updateType, user, userDetails } from "../../../../domain/models/user"

export type UserRepoPort={
    getDetails(entityManager:EntityManager):Promise<user[]>
    getUserById(id:number, entityManager:EntityManager):Promise<user>
    deleteUsers(id:number, entityManager:EntityManager):Promise<void>
    updateUsers(updateData:updateType, entityManager:EntityManager):Promise<void>
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>
}
