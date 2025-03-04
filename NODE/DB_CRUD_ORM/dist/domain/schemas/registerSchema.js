"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required().messages({
        "string.base": "Username must be a string",
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username must be at most 30 characters long",
        "string.empty": "Username is required",
        "any.required": "Username is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 6 characters long",
        "string.empty": "Password is required",
        "any.required": "Password is required",
    }),
    role: joi_1.default.string().valid("admin", "user").required().messages({
        "string.base": "Role must be a string",
        "string.empty": "Role is required",
        "any.required": "Role is required",
        "any.only": 'Role must be either "admin" or "user"',
    }),
});
