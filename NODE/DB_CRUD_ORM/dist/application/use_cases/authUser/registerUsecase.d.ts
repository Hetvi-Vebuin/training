import { AuthRepoPort } from '../../port/repositories/auth/auth_repo.port';
import { EntityManager } from 'typeorm';
export declare const registerUseCase: (email: string, username: string, password: string, role: string, authRepo: AuthRepoPort, t: EntityManager) => Promise<void>;
