import * as Joi from 'joi';

import { commonValidator } from '../common/commonValidator';

export const authValidator = {

    registration: Joi.object({
        firstName: Joi.string()
            .required()
            .min(2)
            .max(30)
            .messages({
                'string.min': 'firstName: limit min 2 characters',
                'string.max': 'firstName: limit max 30 characters',
            }),
        lastName: Joi.string()
            .required()
            .min(2)
            .max(30)
            .messages({
                'string.min': 'lastName: limit min 2 characters',
                'string.max': 'lastName: limit max 30 characters',
            }),
        age: Joi.number()
            .required()
            .min(10)
            .max(100)
            .messages({
                'string.min': 'age: limit min 2 years',
                'string.max': 'age: limit max 100 years',
            }),
        phone: commonValidator.phoneValidator.message('phone not valid'),
        email: commonValidator.emailValidator.message('email not valid'),
        password: commonValidator.passwordValidator.messages({
            'string.min': 'limit min 8 characters',
            'string.pattern.base': 'password not valid',
        }),
    }),

    login: Joi.object({
        email: commonValidator.emailValidator.message('email not valid'),
        password: commonValidator.passwordValidator
            .messages({
                'string.min': 'limit min 8 characters',
                'string.pattern.base': 'password not valid',
            }),
    }),

};
