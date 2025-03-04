import { Request, Response } from "express";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
export declare const getUserDetailsController: (userRepo: UserRepoPort) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
