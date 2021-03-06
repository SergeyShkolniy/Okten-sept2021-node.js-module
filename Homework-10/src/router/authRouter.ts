import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middleware';

const router = Router();

router.post('/login', authMiddleware.validateLoginUser, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.post('/forgotPassword', authMiddleware.checkValidEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', userMiddleware.validatePassword, authMiddleware.checkActionToken, authController.setPassword);

export const authRouter = router;
