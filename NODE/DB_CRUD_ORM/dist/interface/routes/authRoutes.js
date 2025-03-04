"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = require("../controllers/registerController");
const validateSchema_1 = require("../../infrastructure/helpers/middleware/validateSchema");
const registerSchema_1 = require("../../domain/schemas/registerSchema");
const loginSchema_1 = require("../../domain/schemas/loginSchema");
const loginController_1 = require("../controllers/loginController");
const auth_repo_1 = require("../../infrastructure/reposiritories/auth.repo");
const router = express_1.default.Router();
router.post('/login', (0, validateSchema_1.validateSchema)(loginSchema_1.loginSchema), (0, loginController_1.loginController)(auth_repo_1.authRepo));
router.post('/register', (0, validateSchema_1.validateSchema)(registerSchema_1.registerSchema), (0, registerController_1.registerController)(auth_repo_1.authRepo));
exports.default = router;
