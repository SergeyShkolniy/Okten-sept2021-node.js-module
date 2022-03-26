import { Router } from 'express';

import { authController } from '../controller/authController';
import { userMiddleware } from '../middleware/userMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/registration', authMiddleware.validateCreateUser, authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
