import { Request, Response } from 'express';
import { getUserDetailsUsecase } from '../../application/use_cases/user/getUserDetailsUsecase';
import { userRepo } from '../../infrastructure/reposiritories/user.repo';
import { UserRepoPort } from '../../application/port/repositories/user/user_repo.port';

export const getUserDetailsController = (userRepo:UserRepoPort)=> async (req: Request, res: Response) => {
    const { id, role } = res.locals.user;
    try {
        const userData = await getUserDetailsUsecase(id, role, userRepo);

    } catch (error) {
        console.log("Error getting user details:",error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};