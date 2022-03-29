import Joi from 'joi';

import { regex } from '../../constants';

export const commonValidator = {
    idValidator: Joi.string().required(),
    commentIdValidator: Joi.string().required(),
    authorIdValidator: Joi.string().required(),
    userIdValidator: Joi.string().required(),
    emailValidator: Joi.string().required().regex(regex.EMAIL),
    phoneValidator: Joi.string().required().regex(regex.PHONE),
    passwordValidator: Joi.string().required().min(8).regex(regex.PASSWORD),
};
