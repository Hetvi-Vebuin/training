"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = void 0;
const deleteUserUsecase_1 = require("../../application/use_cases/user/deleteUserUsecase");
const auth_repo_1 = require("../../infrastructure/reposiritories/auth.repo");
const deleteUserController = (userRepo) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = res.locals.user;
    const userIdToDelete = parseInt(req.params.id, 10);
    try {
        yield auth_repo_1.authRepo.wrapTransaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, deleteUserUsecase_1.deleteUserUseCase)(userIdToDelete, tokenData, userRepo, t);
        }));
        res.status(200).send({ message: "Successfully deleted" });
    }
    catch (error) {
        const err = error;
        console.error("Error deleting user:", error);
        if (err.message === "Unauthorized") {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this user" });
        }
        if (err.message === "User not found") {
            return res.status(409).json({ error: "User does not exist" });
        }
        res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUserController = deleteUserController;
