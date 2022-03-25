import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    const errorBody = err.details.get('body');
    const { details: [message] } = errorBody;
    console.log(message);
    res
        .status(err.code || 500)
        .json({ message: message.message });
});

export const apiRouter = router;
