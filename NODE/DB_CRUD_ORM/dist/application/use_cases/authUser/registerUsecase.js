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
exports.registerUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUseCase = (email, username, password, role, authRepo, t) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield authRepo.getDetailByEmail(email, t);
    if (existingUser) {
        const error1 = new Error('Email is already taken');
        throw error1;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield authRepo.registerDetail(email, username, hashedPassword, role, t);
});
exports.registerUseCase = registerUseCase;
