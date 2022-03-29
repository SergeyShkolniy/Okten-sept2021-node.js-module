import * as Joi from 'joi';

import { commonValidator } from '../common/commonValidator';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('email not valid'),
        password: commonValidator.passwordValidator
            .messages({
                'string.min': 'limit min 8 characters',
                'string.pattern.base': 'password not valid',
            }),
    }),

};
