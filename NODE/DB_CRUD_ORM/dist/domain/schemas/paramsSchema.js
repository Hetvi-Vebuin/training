"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const paramsSchema = joi_1.default.object({
    id: joi_1.default.number().min(1).integer().required().messages({
        "string.min": "Id is required",
        "number.base": "The requested id should be a valid number.",
    }),
});
exports.default = paramsSchema;
