import { Router } from 'express';
import { authController } from '../controller/authController';
import { userMiddleware } from '../middleware/userMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
// router.post('/logout');
// router.post('/refresh');

export const authRouter = router;