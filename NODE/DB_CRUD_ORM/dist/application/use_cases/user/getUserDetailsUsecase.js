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
exports.getUserDetailsUseCase = void 0;
const getUserDetailsUseCase = (userId, role, isAdmin, userRepo, t) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userRepo.getUserById(userId, t);
    if (isAdmin) {
        if (role === "admin") {
            // If isAdmin is true and role is admin, return all user details
            return yield userRepo.getDetails(t);
        }
    }
    else {
        return yield userRepo.getUserById(userId, t);
    }
});
exports.getUserDetailsUseCase = getUserDetailsUseCase;
