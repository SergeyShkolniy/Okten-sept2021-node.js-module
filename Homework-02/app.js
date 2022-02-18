const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [];

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/users', (req, res) =>{

    if (Object.keys(req.query).length){
        let usersQuery = [...users];

        if (req.query.age){
            usersQuery = usersQuery.filter(user => user.age === req.query.age);
        }
        if (req.query.city){
            usersQuery = usersQuery.filter(user => user.city === req.query.city);
        }
        res.render('users', {users: usersQuery});
        return;
    }
    res.render('users', {users});
} )

app.get('/users/:userId', (req, res) => {
    const user = users.find(user => user.id === +req.params.userId);

    if (!user){
        console.log('Такого пользователя нет!!!');
        res.redirect('/notFound');
    }else{
        res.render('user', {user});
    }
})

app.get('/error', (req, res) => {
    res.render('error');
});

app.post('/login', (req, res) => {
    const uniqueEmail = users.some(user => user.email === req.body.email);

    if (uniqueEmail) {
        console.log('Пользователь с такой электронной почтой уже есть!!!');
        res.redirect('/error');
    } else {
        users.push({...req.body, id:users.length+1});
        res.redirect('/users');
    }
})

app.use((req, res) => {
    res.render('notFound');
})

app.listen(5200, () => {
    console.log('Сервер работает');
})
