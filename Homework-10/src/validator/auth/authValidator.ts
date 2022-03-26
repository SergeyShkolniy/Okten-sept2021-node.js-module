import * as Joi from 'joi';

import { commonValidator } from '../common/commonValidator';

export const authValidator = {

    registration: Joi.object({
        firstName: Joi.string()
            .required()
            .min(2)
            .max(30)
            .message('name name name name'),
        lastName: Joi.string().min(2).max(30).required(),
        age: Joi.number().min(10).max(100).required(),
        phone: commonValidator.phoneValidator,
        email: commonValidator.emailValidator,
        password: commonValidator.passwordValidator,
    }),

    login: Joi.object({
        email: commonValidator.emailValidator,
        password: commonValidator.passwordValidator,
    }),

};
