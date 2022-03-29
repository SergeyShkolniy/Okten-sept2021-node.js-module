import { Router } from 'express';

import { commentController } from '../controller';
import { commentMiddleware } from '../middleware';

const router = Router();
router.get('/:authorId', commentMiddleware.validateAuthorId, commentController.getAllCommentAuthorId);
router.patch('/action', commentMiddleware.validateCommentId, commentMiddleware.validateAction, commentController.patchComment);

export const commentRouter = router;
