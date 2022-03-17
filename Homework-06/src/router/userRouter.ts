import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.patch('/:id', userController.patchUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
