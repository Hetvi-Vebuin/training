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
exports.updateUserController = void 0;
const updateUserUsecase_1 = require("../../application/use_cases/user/updateUserUsecase");
const auth_repo_1 = require("../../infrastructure/reposiritories/auth.repo");
const updateUserController = (userRepo) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = res.locals.user;
    const updateData = req.body;
    try {
        yield auth_repo_1.authRepo.wrapTransaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, updateUserUsecase_1.updateUserUseCase)(tokenData, updateData, userRepo, t);
        }));
        res.status(200).send({ message: "Successfully updated user" });
    }
    catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUserController = updateUserController;
