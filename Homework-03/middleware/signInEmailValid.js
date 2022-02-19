const users = require("../db/users");

function signInEmailValid(req, res, next) {
    try {
        const {email} = req.body;
        const emailValid = users.find(user => user.email === email);
        console.log(email);

        if (!emailValid) {
            throw new Error('пользователя с таким email нет! ');
        }
        next();

    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}

module.exports = signInEmailValid;