import { Request, Response } from "express";
import { updateUserUsecase } from "../../application/use_cases/user/updateUserUsecase";
import { tokenType, updateType } from "../../domain/models/user";
import { userRepo } from "../../infrastructure/reposiritories/user.repo";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";

export const updateUserController =
  (userRepo: UserRepoPort) => async (req: Request, res: Response) => {
    const tokenData: tokenType = res.locals.user;
    const updateData: updateType = req.body;

    try {
      await updateUserUsecase(tokenData, updateData, userRepo);
      res.status(200).send({ message: "Successfully updated user" });
    } catch (error) {
      console.log("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };
