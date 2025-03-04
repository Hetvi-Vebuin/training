import { Request, Response } from "express";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
export declare const registerController: (authRepo: AuthRepoPort) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
