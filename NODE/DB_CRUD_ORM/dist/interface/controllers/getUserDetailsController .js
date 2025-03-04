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
exports.getUserDetailsController = void 0;
const getUserDetailsUsecase_1 = require("../../application/use_cases/user/getUserDetailsUsecase");
const auth_repo_1 = require("../../infrastructure/reposiritories/auth.repo");
const getUserDetailsController = (userRepo) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = res.locals.user;
    const isAdmin = req.query.isAdmin === "true";
    try {
        const userData = yield auth_repo_1.authRepo.wrapTransaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, getUserDetailsUsecase_1.getUserDetailsUseCase)(id, role, isAdmin, userRepo, t);
        }));
        res
            .status(200)
            .json({ message: "User details retrieved successfully", userData });
    }
    catch (error) {
        console.error("Error getting user details:", error);
        if (error.status === 404) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(500).json({ error: "Failed to fetch user details" });
    }
});
exports.getUserDetailsController = getUserDetailsController;
