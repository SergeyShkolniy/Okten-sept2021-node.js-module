"use strict";
// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const userEntity_1 = require("./entity/userEntity");
const postEntity_1 = require("./entity/postEntity");
const commentsEntity_1 = require("./entity/commentsEntity");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(userEntity_1.UserEntity).find({ relations: ['posts', 'comments'] });
    console.log(users);
    res.json(users);
});
app.get('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const allUserPosts = await (0, typeorm_1.getManager)()
        .getRepository(postEntity_1.PostEntity)
        .find({ userId: Number(userId) });
    res.json(allUserPosts);
});
app.get('/comments/:authorId', async (req, res) => {
    const { authorId } = req.params;
    const allCommentsUser = await (0, typeorm_1.getManager)()
        .getRepository(commentsEntity_1.CommentsEntity)
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
    const createdUser = await (0, typeorm_1.getManager)().getRepository(userEntity_1.UserEntity).save(req.body);
    res.json(createdUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(userEntity_1.UserEntity)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
app.patch('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const patchPost = await (0, typeorm_1.getManager)()
        .getRepository(postEntity_1.PostEntity)
        .update({ id: Number(req.params.userId) }, {
        text,
    });
    res.json(patchPost);
});
app.patch('/comments/action', async (req, res) => {
    const { action, commentId } = req.body;
    if (action === 'like') {
        const patchComment = await (0, typeorm_1.getManager)()
            .getRepository(commentsEntity_1.CommentsEntity)
            .update({ id: Number(commentId) }, {
            like: +1,
        });
        res.json(patchComment);
    }
    if (action === 'dislike') {
        const patchComment = await (0, typeorm_1.getManager)()
            .getRepository(commentsEntity_1.CommentsEntity)
            .update({ id: Number(commentId) }, {
            dislike: -1,
        });
        res.json(patchComment);
    }
});
// app.patch('/comments/action', async (req:Request, res:Response) => {
//     const { action, commentId } = req.body;
//     const patchComment = getManager().getRepository(CommentsEntity);
//     const comment = await patchComment.createQueryBuilder('comment')
//         .where('comment.id = :id', { id: commentId })
//         .getOne();
//
//     if (!comment) {
//         throw new Error('wrong comment ID');
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
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(userEntity_1.UserEntity)
        .softDelete({ id: Number(req.params.id) });
    res.json(createdUser);
});
app.listen(5200, async () => {
    console.log('Server started of PORT 5200 !!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map