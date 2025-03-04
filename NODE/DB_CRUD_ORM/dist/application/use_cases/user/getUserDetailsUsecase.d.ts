import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
export declare const getUserDetailsUseCase: (userId: number, role: string, isAdmin: boolean | undefined, userRepo: UserRepoPort, t: EntityManager) => Promise<import("../../../domain/models/user").user | import("../../../domain/models/user").user[] | undefined>;
