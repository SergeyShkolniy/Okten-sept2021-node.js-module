import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = process.env;

app.listen(5200, async () => {
    console.log(`Serves started on PORT:${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected URAAAA');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
