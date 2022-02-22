const users = require('../db/users');

class SignInController{

    renderSignIn(req, res){
        res.render('signIn');
    }

    signInToPageUser(req, res){
        const signInUser = users.find(user => user.email === req.body.email && user.password === req.body.password);
        try {
            if(!signInUser){
                throw new Error('Неправильные данные при входе!!!');
            }else {
                res.redirect(`/users/${signInUser.id}`);
            }
        }catch (err){
            console.log(err.message);
            res.render('error', {send: err.message});
        }
    }
}

module.exports = new SignInController();