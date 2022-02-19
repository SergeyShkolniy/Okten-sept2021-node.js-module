const users = require('../db/users');

class SignInController{

    renderSignIn(req, res){
        res.render('signIn');
    }

    signInToPageUser(req, res){
        const signInUser = users.find(user => user.email === req.body.email && user.password === req.body.password);

        if (signInUser) {
            res.redirect(`/users/${signInUser.id}`);
        } else {
            console.log('Неправильные данные при входе!!!');
            res.redirect('/error');
        }
    }
}

module.exports = new SignInController();