import 'reflect-metadata';
import express from 'express';
import { createConnection, getManager } from 'typeorm';

import { CommentsEntity } from './entity/commentsEntity';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.patch(
    '/comment/action',
    async (req, res) => {
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
    },
);

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
