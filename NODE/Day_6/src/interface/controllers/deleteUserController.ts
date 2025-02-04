import { Request, Response } from "express";
import { deleteUserUsecase } from "../../application/use_cases/user/deleteUserUsecase";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
import { tokenType } from "../../domain/models/user";

export const deleteUserController =
  (userRepo: UserRepoPort) => async (req: Request, res: Response) => {
    const tokenData: tokenType = res.locals.user;
    const userIdToDelete = parseInt(req.params.id, 10);
    try {
      await deleteUserUsecase(userIdToDelete, tokenData, userRepo);
      res.status(200).send({ message: "Successfully deleted" });
    } catch (error) {
      console.log("Error deleting user:",error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
