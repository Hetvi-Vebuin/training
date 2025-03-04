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
exports.loginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUseCase = (email, password, authRepo, t) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield authRepo.loginDetail(email, t);
    if (!data) {
        const error = new Error("Email or Password incorrect");
        throw error;
    }
    const isValid = yield bcrypt_1.default.compare(password, data.password);
    if (!isValid) {
        const error = new Error("Invalid password");
        throw error;
    }
    const token = jsonwebtoken_1.default.sign({ id: data.id, role: data.role }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "EMP0375", {
        expiresIn: "1h",
    });
    return { token };
});
exports.loginUseCase = loginUseCase;
