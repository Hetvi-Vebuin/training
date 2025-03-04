import { AuthRepoPort } from "../../port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm";
export declare const loginUseCase: (email: string, password: string, authRepo: AuthRepoPort, t: EntityManager) => Promise<{}>;
