import { user } from "../../../../domain/models/user"
import { EntityManager } from "typeorm"

export type AuthRepoPort={
    loginDetail(email:string, entityManager:EntityManager):Promise<user|null>
    registerDetail(email:string, username:string, password:string, role:string, entityManager:EntityManager):Promise<void>
    getDetailByEmail(email:string, entityManager:EntityManager):Promise<user|null>
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>
}