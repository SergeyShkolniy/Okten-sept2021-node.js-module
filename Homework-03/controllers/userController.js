const users = require('../db/users');

class UserController {

    renderUsers(req, res) {
        if (Object.keys(req.query).length) {
            let usersQuery = [...users];

            if (req.query.age) {
                usersQuery = usersQuery.filter(user => user.age === req.query.age);
            }
            if (req.query.city) {
                usersQuery = usersQuery.filter(user => user.city === req.query.city);
            }
            res.render('users', {users: usersQuery});
            return;
        }
        res.render('users', {users});
    }

    renderUsersId(req, res){
        const user = users.find(user => user.id === +req.params.userId);

        if (!user) {
            console.log('Такого пользователя нет!!!');
            res.redirect('/notFound');
        } else {
            res.render('user', {user});
        }
    }
}

module.exports = new UserController();

