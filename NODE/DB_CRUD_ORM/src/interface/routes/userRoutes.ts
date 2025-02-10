import express from 'express';
import { getUserDetailsController } from '../controllers/getUserDetailsController ';
import { updateUserController } from '../controllers/updateUserController';
import { deleteUserController } from '../controllers/deleteUserController';
import { authMiddleware } from '../../infrastructure/helpers/middleware/auth';
import { validateSchema } from '../../infrastructure/helpers/middleware/validateSchema';
import { updateSchema } from '../../domain/schemas/updateSchema';
import { userRepo } from '../../infrastructure/reposiritories/user.repo';
import paramsSchema from '../../domain/schemas/paramsSchema';

const router = express.Router();

router.get('/me', authMiddleware, getUserDetailsController(userRepo));
router.patch('/me', validateSchema(updateSchema), authMiddleware, updateUserController(userRepo));
router.delete('/delete/:id',validateSchema(paramsSchema), authMiddleware, deleteUserController(userRepo));

export default router;
