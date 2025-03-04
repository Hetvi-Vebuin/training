import { Request, Response } from "express";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
export declare const loginController: (authRepo: AuthRepoPort) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
