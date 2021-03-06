import 'reflect-metadata';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { cronRun } from './cron';
import { config } from './config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

// const { PORT } = config.PORT;

app.listen(config.PORT, async () => {
    console.log(`Serves started on PORT:${config.PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
