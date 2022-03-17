import { Router } from 'express';
import { commentController } from '../controller/commentController';

const router = Router();
router.get('/:authorId', commentController.getAllCommentAuthorId);
router.patch('/action');

export const commentRouter = router;
