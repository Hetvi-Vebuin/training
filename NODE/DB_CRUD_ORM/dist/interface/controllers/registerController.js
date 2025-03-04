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
exports.registerController = void 0;
const registerUsecase_1 = require("../../application/use_cases/authUser/registerUsecase");
const registerController = (authRepo) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, role } = req.body;
        yield authRepo.wrapTransaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, registerUsecase_1.registerUseCase)(email, username, password, role, authRepo, t);
        }));
        res.status(201).json({
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        if ((error = "Email is already taken")) {
            return res.status(409).json({ message: "Email is already taken" });
        }
        else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
exports.registerController = registerController;
