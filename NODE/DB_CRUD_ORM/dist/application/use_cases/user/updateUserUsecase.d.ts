import { EntityManager } from "typeorm";
import { tokenType, updateType } from "../../../domain/models/user";
import { UserRepoPort } from "../../port/repositories/user/user_repo.port";
export declare const updateUserUseCase: (tokenData: tokenType, updateData: updateType, userRepo: UserRepoPort, t: EntityManager) => Promise<void>;
