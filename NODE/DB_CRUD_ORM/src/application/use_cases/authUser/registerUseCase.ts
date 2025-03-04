import { AuthRepoPort } from '../../port/repositories/auth/auth_repo.port';
import { EntityManager } from 'typeorm';
import { registerType, user } from '../../../domain/models/user';

export const registerUseCase = async (email:string, username:string, password:string, role:string, authRepo: AuthRepoPort, t:EntityManager) => {
    const existingUser:user|null = await authRepo.getDetailByEmail(email, t);
    if (existingUser) {
        const error= new Error('Email is already taken');
        throw error;
    }
        
    await authRepo.registerDetail(email, username, password, role, t);
};
