"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    email: joi_1.default.string().email(),
    username: joi_1.default.string().min(3).max(30),
    password: joi_1.default.string().min(6),
});
