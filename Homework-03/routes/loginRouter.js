const {Router} = require('express');
const loginController = require('../controllers/loginController');
const loginFieldValidation = require('../middleware/loginFieldValidation');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', loginFieldValidation, loginController.pushUserAndTransition);

module.exports = loginRouter;
