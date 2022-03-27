import { Router } from 'express';

import { postController } from '../controller';

const router = Router();

router.get('/:userId', postController.getAllPostsUserId);
router.patch('/:id', postController.patchPost);

export const postRouter = router;
