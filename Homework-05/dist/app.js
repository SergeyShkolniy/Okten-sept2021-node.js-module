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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(userEntity_1.UserEntity).find({ relations: ['posts', 'comments'] });
    console.log(users);
    res.json(users);
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