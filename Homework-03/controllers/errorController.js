class ErrorController{
    renderError(req,res){
        res.render('error');
    }
}

module.exports = new ErrorController();