import { Request, Response } from "express";
import { registerUsecase } from "../../application/use_cases/authUser/registerUsecase";
import { authRepo } from "../../infrastructure/reposiritories/auth.repo";
import { AuthRepoPort } from "../../application/port/repositories/auth/auth_repo.port";

export const registerController =
  (authRepo: AuthRepoPort) => async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;

      await registerUsecase(username, password, role, authRepo);

      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
