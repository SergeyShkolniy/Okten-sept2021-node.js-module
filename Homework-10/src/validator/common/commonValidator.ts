import { Joi } from 'celebrate';
import { regex } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string().regex(regex.EMAIL).required(),
    phoneValidator: Joi.string().regex(regex.PHONE).required(),
    passwordValidator: Joi.string().min(8).regex(regex.PASSWORD).required(),
};
