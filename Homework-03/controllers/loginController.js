const users = require('../db/users');

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    pushUserAndTransition(req, res){
        const uniqueEmail = users.some(user => user.email === req.body.email);

        if (uniqueEmail) {
            console.log('Пользователь с такой электронной почтой уже есть!!!');
            res.redirect('/error');
        } else {
            users.push({...req.body, id: users.length + 1});
            res.redirect('/users');
        }
    }
}

module.exports = new LoginController();