import { Joi, Segments } from 'celebrate';

import { commonValidator } from '../common/commonValidator';

export const authValidator = {

    registration: {
        [Segments.BODY]: Joi.object({
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(2).max(30).required(),
            age: Joi.number().min(10).max(100).required(),
            phone: commonValidator.phoneValidator,
            email: commonValidator.emailValidator,
            password: commonValidator.passwordValidator,
        }),
    },

    login: {
        [Segments.BODY]: Joi.object({
            email: commonValidator.emailValidator,
            password: commonValidator.passwordValidator,
        }),
    },
};
