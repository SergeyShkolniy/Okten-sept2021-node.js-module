import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authController } from '../controller/authController';
import { userMiddleware } from '../middleware/userMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { authValidator } from '../validator';

const router = Router();

router.post('/registration', celebrate(authValidator.registration), authController.registration);
router.post('/login', celebrate(authValidator.login), userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
