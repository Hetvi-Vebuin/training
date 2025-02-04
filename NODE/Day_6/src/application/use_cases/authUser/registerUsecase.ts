import bcrypt from 'bcrypt';
import { AuthRepoPort } from '../../port/repositories/auth/auth_repo.port';

export const registerUsecase = async (username: string, password: string, role: string, authRepo: AuthRepoPort) => {
    const existingUser = await authRepo.getDetailByUsername(username);

    if (existingUser[0]) {
        throw new Error('Username is already taken');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await authRepo.registerDetail(username, hashedPassword, role);
};
