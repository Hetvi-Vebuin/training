import { Request, Response } from "express";
import { registerUseCase } from "../../application/use_cases/authUser/registerUsecase";
import { authRepo } from "../../infrastructure/reposiritories/auth.repo";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";
import { EntityManager } from "typeorm/entity-manager/EntityManager";

export const registerController =
  (authRepo: AuthRepoPort) => async (req: Request, res: Response) => {
    try {
      const { email, username, password, role } = req.body;

      await authRepo.wrapTransaction(async (t: EntityManager) => {
        await registerUseCase(email, username, password, role, authRepo, t);
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.error("Error registering user:", error);

        return res.status(409).json({ message: "Email is already taken" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };
