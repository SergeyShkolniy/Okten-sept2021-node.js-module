const {Router} = require('express');
const ErrorController = require("../controllers/errorController");

const errorRouter = Router();

errorRouter.get('/', ErrorController.renderError);

module.exports = errorRouter;