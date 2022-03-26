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
// router.use('*', (err, req, res, next) => {
//     res
//         .status(err.status || 500)
//         .json({
//             message: err.message,
//             data: err.data,
//         });
// });

export const apiRouter = router;
