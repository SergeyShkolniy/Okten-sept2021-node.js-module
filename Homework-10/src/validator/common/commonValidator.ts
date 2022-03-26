import Joi from 'joi';
import { regex } from '../../constants';

export const commonValidator = {
    emailValidator: Joi.string().required().regex(regex.EMAIL).message('email not valid'),
    phoneValidator: Joi.string().required().regex(regex.PHONE).message('phone not valid'),
    passwordValidator: Joi.string().required().min(8).regex(regex.PASSWORD)
        .message('password not valid'),
};
