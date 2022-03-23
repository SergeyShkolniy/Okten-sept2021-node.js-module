// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comment, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comment/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comment/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { UserEntity } from './entity/userEntity';
import { PostEntity } from './entity/postEntity';
import { CommentsEntity } from './entity/commentsEntity';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(UserEntity).find({ relations: ['posts', 'comments'] });
    console.log(users);
    res.json(users);
});
app.get('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const allUserPosts = await getManager()
        .getRepository(PostEntity)
        .find({ userId: Number(userId) });
    res.json(allUserPosts);
});

app.get('/comment/:authorId', async (req:Request, res:Response) => {
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

app.post('/users', async (req, res) => {
    console.log(req.body);
    const createdUser = await getManager().getRepository(UserEntity).save(req.body);
    res.json(createdUser);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager()
        .getRepository(UserEntity)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
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

app.patch('/comment/action', async (req, res) => {
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

// app.patch('/comment/action', async (req:Request, res:Response) => {
//     const { action, commentId } = req.body;
//     const patchComment = getManager().getRepository(CommentsEntity);
//     const comment = await patchComment.createQueryBuilder('comment')
//         .where('comment.id = :id', { id: commentId })
//         .getOne();
//
//     if (!comment) {
//         console.error('error');
//     }
//
//     if (action === 'like') {
//         await patchComment.update({ id: commentId }, { like: comment.like + 1 });
//     }
//     if (action === 'dislike') {
//         await patchComment.update({ id: commentId }, { dislike: comment.dislike + 1 });
//     }
//     res.sendStatus(201);
// });

app.delete('/users/:id', async (req, res) => {
    console.log(req.body);
    const createdUser = await getManager()
        .getRepository(UserEntity)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
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
