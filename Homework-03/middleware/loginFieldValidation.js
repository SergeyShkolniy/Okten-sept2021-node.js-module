function loginFieldValidation (req, res, next){
   try {
       const {firstName, lastName, age, city, email, password} = req.body;

       if (!firstName) {
           throw new Error('не заполнено поле firstName ');
       }
       if (!lastName){
           throw new Error('не заполнено поле lastName ');
       }
       if (!age){
           throw new Error('не заполнено поле age ');
       }
       if (!city){
           throw new Error('не заполнено поле city ');
       }
       if (!email){
           throw new Error('не заполнено поле email ');
       }
       if (!password){
           throw new Error('не заполнено поле password ');
       }
       next();

   }catch (err){
       console.log(err.message);
       res.render('error', {send: err.message});
   }
}

module.exports = loginFieldValidation;