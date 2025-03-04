import { Request, Response } from "express";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
export declare const updateUserController: (userRepo: UserRepoPort) => (req: Request, res: Response) => Promise<void>;
