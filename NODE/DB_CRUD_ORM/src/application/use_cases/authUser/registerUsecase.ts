import bcrypt from 'bcrypt';
import { AuthRepoPort } from '../../port/repositories/auth/auth_repo.port';
import { EntityManager } from 'typeorm';
import { registerType } from '../../../domain/models/user';

export const registerUseCase = async (email:string, username:string, password:string, role:string, authRepo: AuthRepoPort, t:EntityManager) => {
    const existingUser = await authRepo.getDetailByEmail(email, t);
    if (existingUser) {
        const error= new Error('Email is already taken');
        throw error;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await authRepo.registerDetail(email, username, hashedPassword, role, t);
};
