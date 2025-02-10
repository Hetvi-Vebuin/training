import { Request, Response } from "express";
import { registerUseCase } from "../../application/use_cases/authUser/registerUsecase";
import { authRepo } from "../../infrastructure/reposiritories/auth.repo";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { registerType } from "../../domain/models/user";

export const registerController =
  (authRepo: AuthRepoPort) => async (req: Request, res: Response) => {
    try {
      const { email, username, password, role } = req.body;

      // await registerUsecase(username, password, role, authRepo);
      
      await authRepo.wrapTransaction(async (t: EntityManager) => {
        await registerUseCase(email, username, password, role, authRepo, t);
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
