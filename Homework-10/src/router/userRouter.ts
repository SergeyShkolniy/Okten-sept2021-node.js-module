import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middleware';

const router = Router();

router.post('/', userMiddleware.validateCreateUser, userMiddleware.checkIsUserExistForCreate, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:email', userMiddleware.validateEmail, userController.getUserByEmail);
router.patch('/:id', userMiddleware.validateId, userController.patchUser);
router.delete('/:id', userMiddleware.validateId, userController.deleteUser);

export const userRouter = router;
