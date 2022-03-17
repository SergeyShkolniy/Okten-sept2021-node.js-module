import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { PostEntity } from './entity/postEntity';
import { CommentsEntity } from './entity/commentsEntity';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.get('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const allUserPosts = await getManager()
        .getRepository(PostEntity)
        .find({ userId: Number(userId) });
    res.json(allUserPosts);
});

app.get('/comments/:authorId', async (req:Request, res:Response) => {
    const { authorId } = req.params;
    const allCommentsUser = await getManager()
        .getRepository(CommentsEntity)
        .find({
            relations: ['post'],
            where: {
                authorId: Number(authorId),
            },
        });
    res.json(allCommentsUser);
});

app.patch('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const patchPost = await getManager()
        .getRepository(PostEntity)
        .update({ id: Number(req.params.userId) }, {
            text,
        });
    res.json(patchPost);
});

app.patch('/comments/action', async (req, res) => {
    const { action, commentId } = req.body;

    const comment = await getManager()
        .getRepository(CommentsEntity)
        .findOne({ id: Number(commentId) });

    if (action === 'like') {
        const patchComment = await getManager()
            .getRepository(CommentsEntity)
            .update({ id: Number(commentId) }, {
                like: (() => `${comment?.like} + 1`),
            });
        res.json(patchComment);
    }
    if (action === 'dislike') {
        const patchComment = await getManager()
            .getRepository(CommentsEntity)
            .update({ id: Number(commentId) }, {
                dislike: (() => `${comment?.dislike} - 1`),
            });
        res.json(patchComment);
    }
});

app.listen(5200, async () => {
    console.log('Server started of PORT 5200 !!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
