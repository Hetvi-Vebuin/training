import { EntityManager } from "typeorm";
import { tokenType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
export declare const deleteUserUseCase: (userId: number, tokenData: tokenType, userRepo: UserRepoPort, t: EntityManager) => Promise<void>;
