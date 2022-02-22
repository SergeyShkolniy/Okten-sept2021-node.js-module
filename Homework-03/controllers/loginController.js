const users = require('../db/users');

class LoginController {

    renderLogin(req, res) {
        res.render('login');
    }

    pushUserAndTransition(req, res){
        try {
            const uniqueEmail = users.some(user => user.email === req.body.email);

            if (uniqueEmail) {
                throw new Error('Пользователь с такой электронной почтой уже есть!!!');

            } else {
                users.push({...req.body, id: users.length + 1});
                res.redirect('/users');
            }
        }catch (err){
            console.log(err.message);
            res.render('error', {send: err.message});
        }
    }
}

module.exports = new LoginController();