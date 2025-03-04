"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserDetailsController_1 = require("../controllers/getUserDetailsController ");
const updateUserController_1 = require("../controllers/updateUserController");
const deleteUserController_1 = require("../controllers/deleteUserController");
const auth_1 = require("../../infrastructure/helpers/middleware/auth");
const validateSchema_1 = require("../../infrastructure/helpers/middleware/validateSchema");
const updateSchema_1 = require("../../domain/schemas/updateSchema");
const user_repo_1 = require("../../infrastructure/reposiritories/user.repo");
const paramsSchema_1 = __importDefault(require("../../domain/schemas/paramsSchema"));
const router = express_1.default.Router();
router.get('/me', auth_1.authMiddleware, (0, getUserDetailsController_1.getUserDetailsController)(user_repo_1.userRepo));
router.patch('/me', (0, validateSchema_1.validateSchema)(updateSchema_1.updateSchema), auth_1.authMiddleware, (0, updateUserController_1.updateUserController)(user_repo_1.userRepo));
router.delete('/delete/:id', (0, validateSchema_1.validateSchema)(paramsSchema_1.default), auth_1.authMiddleware, (0, deleteUserController_1.deleteUserController)(user_repo_1.userRepo));
exports.default = router;
