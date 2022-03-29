import * as Joi from 'joi';

import { commonValidator } from '../common/commonValidator';

export const paramsValidator = {

    id: Joi.object({
        id: commonValidator.idValidator,
    }),

    commentId: Joi.object({
        commentId: commonValidator.commentIdValidator,
    }),

    authorId: Joi.object({
        authorId: commonValidator.authorIdValidator,
    }),

    userId: Joi.object({
        userId: commonValidator.authorIdValidator,
    }),

    email: Joi.object({
        email: commonValidator.emailValidator.message('email not valid'),
    }),

    emailAndPassword: Joi.object({
        email: commonValidator.emailValidator.message('email not valid'),
        password: commonValidator.passwordValidator
            .messages({
                'string.min': 'limit min 8 characters',
                'string.pattern.base': 'password not valid',
            }),
    }),

};
