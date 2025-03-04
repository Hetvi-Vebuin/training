import { Request, Response } from "express";
import { registerUseCase } from "../../application/use_cases/authUser/registerUseCase";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { registerType } from "../../domain/models/user";

export const registerController =
  (authRepo: AuthRepoPort) => async (req: Request, res: Response) => {
    try {
      const { email, username, password, role }:registerType = req.body;      
      
      await authRepo.wrapTransaction(async (t: EntityManager) => {
        await registerUseCase(email, username, password, role, authRepo, t);
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.error("Error registering user:", error);

      if ((error.message === "Email is already taken")) {
        return res.status(409).json({ message: "Email is already taken" });
      }
      else{
        res.status(500).json({ message: "Internal Server Error" });
      }
    }

  };
