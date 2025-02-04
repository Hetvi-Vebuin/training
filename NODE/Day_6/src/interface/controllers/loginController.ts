import { Request, Response } from 'express';
import { loginUsecase } from '../../application/use_cases/authUser/loginUsecase';
import { AuthRepoPort } from '../../application/port/repositories/auth/auth_repo.port';

export const loginController =(authRepo:AuthRepoPort)=> async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;
        
        const data = await loginUsecase(username, password, authRepo);
        if (!data) {
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
