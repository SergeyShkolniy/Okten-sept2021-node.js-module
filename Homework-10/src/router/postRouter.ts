import { Router } from 'express';

import { postController } from '../controller';
import { postMiddleware } from '../middleware/postMiddleware';

const router = Router();

router.get('/:userId', postMiddleware.validateUserId, postController.getAllPostsUserId);
router.patch('/:id', postMiddleware.validateId, postController.patchPost);

export const postRouter = router;
