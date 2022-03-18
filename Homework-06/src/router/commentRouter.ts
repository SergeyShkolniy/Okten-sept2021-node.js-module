import { Router } from 'express';
import { commentController } from '../controller/commentController';

const router = Router();
router.get('/:authorId', commentController.getAllCommentAuthorId);
router.patch('/action', commentController.patchComment);

export const commentRouter = router;
