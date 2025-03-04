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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repo_1 = require("../../../infrastructure/reposiritories/auth.repo");
const updateUserUseCase = (tokenData, updateData, userRepo, t) => __awaiter(void 0, void 0, void 0, function* () {
    if (tokenData.role !== "admin" && tokenData.id !== updateData.id) {
        throw new Error("Unauthorized");
    }
    const existingUser = yield userRepo.getUserById(updateData.id, t);
    if (!existingUser) {
        throw new Error("User not found");
    }
    if (updateData.email) {
        const existingUser = yield auth_repo_1.authRepo.getDetailByEmail(updateData.email, t);
        if (existingUser && existingUser.id !== updateData.id) {
            throw new Error('Email is already taken');
        }
    }
    if (updateData.password) {
        const hashedPassword = yield bcrypt_1.default.hash(updateData.password, 10);
        updateData.password = hashedPassword;
    }
    yield userRepo.updateUsers(updateData, t);
});
exports.updateUserUseCase = updateUserUseCase;
