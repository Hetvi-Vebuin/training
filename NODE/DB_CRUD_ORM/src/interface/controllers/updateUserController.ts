import { Request, Response } from "express";
import { updateUserUseCase } from "../../application/use_cases/user/updateUserUseCase";
import { tokenType, updateType } from "../../domain/models/user";
import { userRepo } from "../../infrastructure/reposiritories/user.repo";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
import { authRepo } from "../../infrastructure/reposiritories/auth.repo";
import { EntityManager } from "typeorm";

export const updateUserController =
  (userRepo: UserRepoPort) => async (req: Request, res: Response) => {
    const tokenData: tokenType = res.locals.user;
    const updateData: updateType = req.body;

    try {
      await authRepo.wrapTransaction(async (t: EntityManager) => {
        await updateUserUseCase(tokenData, updateData, userRepo, t);
      });

      res.status(200).send({ message: "Successfully updated user" });
    } catch (error: any) {
      console.log("Error updating user:", error);

      if (error.message === "Unauthorized") {
        res.status(403).json({ error: "Unauthorized" });
      } else if (error.message === "User not found") {
        res.status(409).json({ error: "User not found" });
      } else if (error.message === "Email is already taken") {
        res.status(400).json({ error: "Email is already taken" });
      } else {
        res.status(500).json({ error: "Failed to update user" });
      }
    }
  };
