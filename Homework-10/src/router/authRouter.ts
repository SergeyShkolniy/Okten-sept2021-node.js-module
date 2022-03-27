import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middleware';

const router = Router();

router.post('/registration', authMiddleware.validateCreateUser, authController.registration);
router.post('/login', authMiddleware.validateLoginUser, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
