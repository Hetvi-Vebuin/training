import express from 'express';
import { registerController } from '../controllers/registerController';
import { validateSchema } from '../../infrastructure/helpers/middleware/validateSchema';
import { registerSchema } from '../../domain/schemas/registerSchema';
import { loginSchema } from '../../domain/schemas/loginSchema';
import { loginController } from '../controllers/loginController';
import { authRepo } from '../../infrastructure/reposiritories/auth.repo';

const router = express.Router();

router.post(
    '/login', 
    validateSchema(loginSchema), 
    loginController(authRepo)
);
router.post(
    '/register', 
    validateSchema(registerSchema), 
    registerController(authRepo)
);

export default router;
