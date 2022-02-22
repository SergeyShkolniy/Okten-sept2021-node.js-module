const {Router} = require('express');

const errorRouter = Router();

errorRouter.get('/', (req, res) => {
    res.render('error');
});

module.exports = errorRouter;