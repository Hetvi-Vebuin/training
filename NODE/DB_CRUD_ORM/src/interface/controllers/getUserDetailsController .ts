import { Request, Response } from "express";
import { getUserDetailsUseCase } from "../../application/use_cases/user/getUserDetailsUsecase";
import { userRepo } from "../../infrastructure/reposiritories/user.repo";
import { UserRepoPort } from "../../application/port/repositories/user/user_repo.port";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { authRepo } from "../../infrastructure/reposiritories/auth.repo";

export const getUserDetailsController =
  (userRepo: UserRepoPort) => async (req: Request, res: Response) => {
    const { id, role } = res.locals.user;
    const isAdmin = req.query.isAdmin === "true";
    try {
      const userData = await authRepo.wrapTransaction(
        async (t: EntityManager) => {
          return await getUserDetailsUseCase(id, role, isAdmin, userRepo, t);
        }
      );
      res
        .status(200)
        .json({ message: "User details retrieved successfully", userData });
    } catch (error: any) {
      console.error("Error getting user details:", error);

      if (error.status === 404) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(500).json({ error: "Failed to fetch user details" });
    }
  };
