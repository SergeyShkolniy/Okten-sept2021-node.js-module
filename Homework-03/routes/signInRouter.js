const {Router} = require('express');
const signInController = require('../controllers/signInController');
const signInEmailValid = require('../middleware/signInEmailValid');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/', signInEmailValid, signInController.signInToPageUser);

module.exports = signInRouter;