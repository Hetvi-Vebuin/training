import { Request, Response } from 'express';
import { loginUseCase } from "../../application/use_cases/authUser/loginUsecase";
import { AuthRepoPort } from '../../application/port/repositories/auth/auth_repo.port';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { wrapTransaction } from '../../infrastructure/helpers/middleware/transaction';

export const loginController =(authRepo:AuthRepoPort)=> async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        
        // const data = await loginUseCase(username, password, authRepo, t);
        
        const data = await authRepo.wrapTransaction(
            async (t: EntityManager) => {
              return await loginUseCase(email, password, authRepo, t);
            }
        );
        if(!data) {
            res.status(401).json({ message: 'Invalid username or password' });
        }
        
        res.status(200).json({
            message: 'Login successful',
            data
        });
    }catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
