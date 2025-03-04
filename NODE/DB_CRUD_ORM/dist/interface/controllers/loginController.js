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
exports.loginController = void 0;
const loginUsecase_1 = require("../../application/use_cases/authUser/loginUsecase");
const loginController = (authRepo) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield authRepo.wrapTransaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, loginUsecase_1.loginUseCase)(email, password, authRepo, t);
        }));
        if (!data) {
            res.status(401).json({ message: "Invalid username or password" });
        }
        res.status(200).json({
            message: "Login successful",
            data,
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        if ((error = "Email or Password incorrect")) {
            return res.status(404).json({ message: "Email or Password incorrect" });
        }
        else if ((error = "Invalid password")) {
            return res.status(401).json({ message: "Invalid password" });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
exports.loginController = loginController;
